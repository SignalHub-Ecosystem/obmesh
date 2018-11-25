
var Obmesh = require('./server.js')

var obmesh = Obmesh({
  channel: 'Obmesh-mainline--m-onz-woz-ere'
})

obmesh.on('ready', function () {
  setInterval(function () {
    obmesh.add({ a: Math.random() })
  }, 5000)
})

// obmesh.on('update', console.log)
