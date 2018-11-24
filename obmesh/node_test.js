

var Obmesh = require('./node.js')

var obmesh = Obmesh()

obmesh.on('ready', function () {
  setInterval(function () {
    obmesh.add({ nick: Math.random(), timestamp: Math.random() })
    // console.log(obmesh.history())
    obmesh.history().forEach(function (i) {
      var timestamp = i[0][0]
      var value = i[0][1]
      console.log('> ', timestamp)
      console.log('> ', value)
    })
  }, 5000)
})

obmesh.on('update', console.log)
