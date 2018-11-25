
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
var wrtc = require('wrtc')

var DAY = 1000 * 60 * 60 * 24

function Obmesh (options) {
  if (!(this instanceof Obmesh)) return new Obmesh(options)
  EventEmitter.call(this)
  this.setMaxListeners(0)
  this.options = Object.assign({
    maxAge: DAY,
    channel: 'Obmesh-mainline--m-onz-woz-ere',
    metadata: {} }, options)
  this.model = ExpiryModel(this.options)
  this.readonly()
  this.connect()
  var self = this
  remember(this.model, process.cwd()+'/obmesh.json', function () {
    console.log('synced')
  })
  setTimeout(function () {
    self.emit('ready', true)
  }, 1000)
}

inherits(Obmesh, EventEmitter)

Obmesh.prototype.add = function (thing) {
  // add *any* local update
  // how to stop DDOS or SPAM???
  this.model.set(new Date().toISOString(), thing)
}

Obmesh.prototype.history = function () {
  return this.model.history()
}

Obmesh.prototype.readonly = function () {
  var self = this
  this.db = hyperdb ('./obmesh4.db', { valueEncoding: 'json' })
  this.db.on('ready', function () {
    console.log('<', self.db.key.toString('hex'), '>')
    var hub = signalhub(self.db.key.toString('hex'),
      [ 'http://localhost:9000' ])
    var sw = swarm(hub, { wrtc: wrtc })
    sw.on('peer', function (peer, id) {
      console.log('peer connected!')
      peer.pipe(self.db.replicate({ live: true })).pipe(peer)
    })
    setInterval(function () {
      self.db.put('/mesh', { a: Math.random() })
    }, 5000)
  })
}

Obmesh.prototype.connect = function () {
  var self = this
  this.hub = signalhub(self.options.channel, [ 'http://localhost:9000' ])
  this.sw = swarm(this.hub, { wrtc: wrtc })
  this.sw.on('peer', function (peer, id) {
    peer.pipe(self.model.createStream()).pipe(peer)
    self.emit('peer', id, self.sw.peers.length)
  })
  this.sw.on('disconnect', function () {
    self.emit('peers', self.sw.peers.length)
  })
}

module.exports = Obmesh
