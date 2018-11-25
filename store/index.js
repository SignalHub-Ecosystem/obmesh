
var assert = require('assert')
var Obmesh = require('../obmesh')

module.exports = function (state, emitter) {
  state.obmesh_channel = null
  state.readonly_channel = 'a78fe7e930a9e9107ca9f1f35e8b1474749ace34b2ac51fa807028ad9ef9fa0a'
  state.obmesh = Obmesh({
    channel: state.obmesh_channel,
    readonly: state.readonly_channel
  })
  if (!state.current_index) state.current_index = []
  emitter.on('refresh::obmesh', function (private_channel) {
    state.obmesh_channel = private_channel
    assert.ok(state.obmesh_channel)
    console.log('> ', state.obmesh_channel)
    state.obmesh = Obmesh({
      channel: state.obmesh_channel,
      readonly: state.readonly_channel
    })
  })
  emitter.on('message::obmesh', function (message) {
    state.obmesh.add(message)
  })
  state.obmesh.db.watch('/mesh', function () {
    state.obmesh.db.get('/mesh', function (e, d) {
      if (!e && d && d[0]) state.current_index = d[0].value
      emitter.emit('render')
    })
  })
}
