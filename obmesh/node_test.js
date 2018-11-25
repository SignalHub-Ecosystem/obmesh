
var Obmesh = require('./server.js')

var obmesh = Obmesh({
  channel: 'Obmesh-mainline--m-onz-woz-ere'
})

obmesh.on('ready', function () {
  setInterval(function () {
    obmesh.add({ timestamp: new Date().toISOString(), message: 'hello world! '+Math.random() })
  }, 5000)
})

// obmesh.on('update', console.log)
