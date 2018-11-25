
// obmesh

var choo = require('choo')
var html = require('choo/html')
var css = require('sheetify')
var persist = require('choo-persist')

css('./tachyons.css')
css('./app.css')

var app = choo()

app.use(persist())
app.use(require('./store'))

app.use(function (state, emitter) {
  console.log('<obmesh> started @', new Date().toISOString())
  state.obmesh_channel = null
  state.readonly_channel = '2e00be1f6b4b3a679567db2a9f57309f487a96a4a822a286fd6615009ddefbb0'
})

app.route('/', require('./views/list.js'))
app.route('/about', require('./views/about.js'))
app.route('/broadcast', require('./views/broadcast.js'))

app.mount('body')
