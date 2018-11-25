
var assert = require('assert')
var Obmesh = require('../obmesh')

module.exports = function (state, emitter) {
  if (!state.obmesh_channel) state.obmesh_channel = 'Obmesh-mainline--m-onz-woz-ere'
  if (!state.readonly_channel) state.readonly_channel = '19a73395cb90eb57cd7734751b7204429ac664f2a2b8cd2a5c3ac5a7e9dadbda'
  state.obmesh = Obmesh({
    channel: state.obmesh_channel,
    readonly: state.readonly_channel
  })
  if (!state.current_index) state.current_index = []
  emitter.on('refresh::obmesh', function (private_channel, readonly_channel) {
    state.obmesh_channel = private_channel
    state.readonly_channel = readonly_channel
    assert.ok(state.obmesh_channel)
    assert.ok(state.readonly_channel)
    state.obmesh = Obmesh({
      channel: state.obmesh_channel,
      readonly: state.readonly_channel
    })
  })
  emitter.on('message::obmesh', function (message) {
    console.log('> message :: ', message)
    state.obmesh.add(message)
  })
  state.obmesh.db.watch('/mesh', function () {
    state.obmesh.db.get('/mesh', function (e, d) {
      if (!e && d && d[0]) state.current_index = d[0].value
      emitter.emit('render')
    })
  })
  state.scrollTop = 0
  emitter.on('scroll', (scrollTop) => {
    state.scrollTop = scrollTop
    emitter.emit('render')
  })
}
