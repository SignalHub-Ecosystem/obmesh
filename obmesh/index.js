
// obmesh

var EventEmitter = require('events').EventEmitter
var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var hypertrie = require('hypertrie')
var storage = require('random-access-idb')
// var ExpiryModel = require('expiry-model')
var inherits = require('inherits')
var crypto = require('crypto')

var readonly = '367b82ac36ae046a09d963c15d149f3dfc94fea1d66a13c8fb8e1dbd5bcc471d'

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
  var random = storage (readonly)
  this.hypertrie = hypertrie (random, { valueEncoding: 'json' })

  this.hypertrie.watch('/mesh', function () {
    self.hypertrie.get('/mesh', function (e, v) {
      if (!e && v[0]) console.log('>> ', v[0])
    })
  })
  this.model.on('update', function (key, data) {
    self.emit('update', key, data)
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

Obmesh.prototype.connect = function () {
  var self = this
  this.hub = signalhub(self.options.channel, [ 'http://localhost:9000' ])
  this.sw = swarm(this.hub)
  this.sw.on('peer', function (peer, id) {
    // peer.pipe(self.model.createStream()).pipe(peer)
    peer.pipe(self.hypertrie.replicate({ live: true })).pipe(peer)
    self.emit('peer', id, self.sw.peers.length)
  })
  this.sw.on('disconnect', function () {
    self.emit('peers', self.sw.peers.length)
  })
}

module.exports = Obmesh
