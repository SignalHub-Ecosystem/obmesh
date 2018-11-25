
var Obmesh = require('./server.js')

var obmesh = Obmesh()

obmesh.on('ready', function () {
  setInterval(function () {
    obmesh.add({ nick: Math.random(), timestamp: Math.random() })
    // obmesh.history().forEach(function (i) {
    //   return i[0][1]
    // })
  }, 5000)
})

// obmesh.on('update', console.log)

setInterval(function () {
  
}, 5000)
