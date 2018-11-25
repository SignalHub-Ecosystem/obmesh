
// obmesh server

var EventEmitter = require('events').EventEmitter
var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var ExpiryModel = require('expiry-model')
var hyperdb = require('hyperdb')
var Remember = require('remember')
var fs = require('fs')
var remember = Remember(fs)
var inherits = require('inherits')
var crypto = require('crypto')
var path = require('path')
var wrtc = require('wrtc')

var DAY = 1000 * 60 * 60 * 24

function Obmesh (options) {
  if (!(this instanceof Obmesh)) return new Obmesh(options)
  EventEmitter.call(this)
  this.setMaxListeners(0)
  this.signalhubs = [ 'http://localhost:9000' ]
  this.options = Object.assign({
    maxAge: DAY,
    channel: null,
    metadata: {} }, options)
  this.model = ExpiryModel(this.options)
  this.connect()
  this.readonly()
  var self = this
  var p = path.normalize(process.cwd()+'/obmesh.json')
  remember(this.model, p, function () {
    console.log('synced ', p)
  })
  setTimeout(function () {
    self.emit('ready', true)
  }, 1000)
}

inherits(Obmesh, EventEmitter)

Obmesh.prototype.add = function (thing) {
  this.model.set(new Date().toISOString(), thing)
}

Obmesh.prototype.history = function () {
  return this.model.history()
}

Obmesh.prototype.readonly = function () {
  var self = this
  this.db = hyperdb ('./obmesh4.db', { valueEncoding: 'json' })
  this.db.on('ready', function () {
    console.log('readonly channel <', self.db.key.toString('hex'), '>')
    var hub = signalhub(self.db.key.toString('hex'), self.signalhubs)
    var sw = swarm(hub, { wrtc: wrtc })
    sw.on('peer', function (peer, id) {
      console.log('<readonly> peer connected! ', id)
      peer.pipe(self.db.replicate({ live: true })).pipe(peer)
    })
    self.model.on('update', function (k, v) {
      self.db.put('/mesh', self.model.history().map(function (i) {
        return i[0][1]
      }))
    })
  })
}

Obmesh.prototype.connect = function () {
  var self = this
  this.hub = signalhub(self.options.channel, self.signalhubs)
  console.log('mesh channel <', self.options.channel, '>')
  this.sw = swarm(this.hub, { wrtc: wrtc })
  this.sw.on('peer', function (peer, id) {
    console.log('<mesh> peer connected ', id)
    peer.pipe(self.model.createStream()).pipe(peer)
    self.emit('peer', id, self.sw.peers.length)
  })
  this.sw.on('disconnect', function () {
    self.emit('peers', self.sw.peers.length)
  })
}

module.exports = Obmesh
