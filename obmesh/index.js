
// obmesh

var EventEmitter = require('events').EventEmitter
var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var ExpiryModel = require('expiry-model')
var Remember = require('remember')
var inherits = require('inherits')
var crypto = require('crypto')

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
  this.connect()
  var self = this
  this.model.on('update', function (key, data) {
    self.emit('update', key, data)
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

Obmesh.prototype.connect = function () {
  var self = this
  this.hub = signalhub(self.options.channel, [ 'http://localhost:9000' ])
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
