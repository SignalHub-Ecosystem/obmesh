
var Obmesh = require('.')

var obmesh = Obmesh()

obmesh.on('ready', function () {
  setInterval(function () {
    obmesh.add({ a: Math.random() })
    console.log(obmesh.history())
  }, 5000)
})

obmesh.on('update', console.log)
