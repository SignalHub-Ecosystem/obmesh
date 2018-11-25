
// obmesh

var EventEmitter = require('events').EventEmitter
var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var storage = require('random-access-idb')
var hyperdb = require('hyperdb')
// var ExpiryModel = require('expiry-model')
var inherits = require('inherits')
var crypto = require('crypto')

var DAY = 1000 * 60 * 60 * 24

var readonly = '530d9bd19525137b518c4ede6133780e3164c658835beebaede46cc5f19ae357'

function Obmesh (options) {
  if (!(this instanceof Obmesh)) return new Obmesh(options)
  EventEmitter.call(this)
  this.setMaxListeners(0)
  this.options = Object.assign({
    maxAge: DAY,
    channel: 'Obmesh-mainline--m-onz-woz-ere',
    metadata: {} }, options)
  // this.model = ExpiryModel(this.options)
  // this.connect()
  var self = this
  self.db = hyperdb (storage(readonly), readonly, { valueEncoding: 'json' })
  self.db.on('ready', function () {
    console.log('<', self.db.key.toString('hex'), '>')
    // self.emit('ready', self.hypertrie.key.toString('hex'))
    var hub = signalhub(self.db.key.toString('hex'),
      [ 'http://localhost:9000' ])
    var sw = swarm(hub)
    sw.on('peer', function (peer, id) {
      console.log('peer connected!')
      peer.pipe(self.db.replicate({ live: true })).pipe(peer)
    })
    self.db.watch('/mesh', function () {
      console.log('.......... /mesh ')
      self.db.get('/mesh', function (e, d) {
        if (!e && d && d[0].hasOwnProperty('value')) console.log(d[0].value)
      })
    })
  })
  // this.model.on('update', function (key, data) {
  //   self.emit('update', key, data)
  // })
  setTimeout(function () {
    self.emit('ready', true)
  }, 1000)
}

inherits(Obmesh, EventEmitter)
//
// Obmesh.prototype.add = function (thing) {
//   this.model.set(new Date().toISOString(), thing)
// }
//
// Obmesh.prototype.history = function () {
//   return this.model.history()
// }

Obmesh.prototype.connect = function () {
  // var self = this
  // this.hub = signalhub(self.options.channel, [ 'http://localhost:9000' ])
  // this.sw = swarm(this.hub)
  // this.sw.on('peer', function (peer, id) {
  //   // peer.pipe(self.model.createStream()).pipe(peer)
  //   peer.pipe(self.hypertrie.replicate({ live: true })).pipe(peer)
  //   self.emit('peer', id, self.sw.peers.length)
  // })
  // this.sw.on('disconnect', function () {
  //   self.emit('peers', self.sw.peers.length)
  // })
}

module.exports = Obmesh
