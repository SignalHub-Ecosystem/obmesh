
var Obmesh = require('.')

var obmesh = Obmesh({
  // channel: 'Obmesh-mainline--m-onz-woz-ere',
  readonly: '25c0fac59c4baf3c61ddd6c82938223f10642a49594df38325cec5f84e7bb7dc'
})

obmesh.on('ready', function () {
  setInterval(function () {
    // obmesh.add({ a: Math.random() })
    // console.log(obmesh.history())
  }, 5000)

  obmesh.db.watch('/mesh', function () {
    console.log('test')
    obmesh.db.get('/mesh', function (e, v) {
      if (!e && v) console.log(v[0])
    })
  })
})

// obmesh.on('update', console.log)
