
var hypertrie = require('hypertrie')
var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var wrtc = require('wrtc')

var t = hypertrie ('./obmesh2.db', { valueEncoding: 'json' })

t.on('ready', function () {
  console.log('<', t.key.toString('hex'), '>')
  var hub = signalhub(t.key.toString('hex'),
    [ 'http://localhost:9000' ])
  var sw = swarm(hub, { wrtc: wrtc })
  sw.on('peer', function (peer, id) {
    console.log('peer connected!')
    peer.pipe(t.replicate({ live: true })).pipe(peer)
  })
})

setInterval(function () {
  t.put('/mesh', { a: Math.random() })
}, 5000)
