

var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var hyperdb = require('hyperdb')
var storage = require('random-access-idb')

var readonly = '530d9bd19525137b518c4ede6133780e3164c658835beebaede46cc5f19ae357'

var t = hyperdb (storage(readonly), readonly, { valueEncoding: 'json' })

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
