

var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var hypertrie = require('hypertrie')
var storage = require('random-access-idb')

var readonly = '367b82ac36ae046a09d963c15d149f3dfc94fea1d66a13c8fb8e1dbd5bcc471d'

var t = hypertrie (storage(readonly), readonly, { valueEncoding: 'json' })

t.on('ready', function () {
  console.log('test 2 !')
  console.log('<', t.key.toString('hex'), '>')
  // self.emit('ready', self.hypertrie.key.toString('hex'))
  var hub = signalhub(t.key.toString('hex'),
    [ 'http://localhost:9000' ])
  var sw = swarm(hub)
  sw.on('peer', function (peer, id) {
    console.log('peer connected!')
    peer.pipe(t.replicate({ live: true })).pipe(peer)
  })
})

t.watch('/mesh', function () {
  console.log('test')
  t.get('/mesh', function (e, d) {
    if (!e && d) console.log(d)
  })
})

//
