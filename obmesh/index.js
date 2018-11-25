
// obmesh

var EventEmitter = require('events').EventEmitter
var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var ExpiryModel = require('expiry-model')
var storage = require('random-access-idb')
var hyperdb = require('hyperdb')
var inherits = require('inherits')
var crypto = require('crypto')

var DAY = 1000 * 60 * 60 * 24

function Obmesh (options) {
  if (!(this instanceof Obmesh)) return new Obmesh(options)
  EventEmitter.call(this)
  this.setMaxListeners(0)
  this.options = Object.assign({
    maxAge: DAY,
    channel: null,
    readonly: null,
    metadata: {} }, options)
  var self = this
  self.signalhubs = [ 'http://localhost:9000' ]
  if (self.options.channel) {
    this.model = ExpiryModel(this.options)
    this.connect()
    this.model.on('update', function (key, data) {
      self.emit('update', key, data)
    })
  }
  self.db = hyperdb (storage(self.options.readonly), self.options.readonly,
    { valueEncoding: 'json' })
  self.db.on('ready', function () {
    console.log('<', self.db.key.toString('hex'), '>')
    var hub = signalhub(self.db.key.toString('hex'), self.signalhubs)
    var sw = swarm(hub)
    sw.on('peer', function (peer, id) {
      console.log('peer connected!')
      peer.pipe(self.db.replicate({ live: true })).pipe(peer)
    })
    setTimeout(function () {
      self.emit('ready', self.db.key.toString('hex'))
    }, 1000)
  })
}

inherits(Obmesh, EventEmitter)

Obmesh.prototype.add = function (thing) {
  if (!this.model) return Error('read-only mode')
  this.model.set(new Date().toISOString(), thing)
}

Obmesh.prototype.history = function () {
  if (!this.model) return Error('read-only mode')
  return this.model.history()
}

Obmesh.prototype.connect = function () {
  var self = this
  this.hub = signalhub(self.options.channel, self.signalhubs)
  this.sw = swarm(this.hub)
  this.sw.on('peer', function (peer, id) {
    peer.pipe(self.model.createStream()).pipe(peer)
    self.emit('peer', id, self.sw.peers.length)
  })
  this.sw.on('disconnect', function () {
    self.emit('peers', self.sw.peers.length)
  })
}

module.exports = Obmesh
