
var Obmesh = require('../obmesh')

module.exports = function (state, emitter) {
  state.obmesh = Obmesh({
    channel: state.obmesh_channel,
    readonly: state.readonly_channel 
  })
  if (!state.current_index) state.current_index = []
  emitter.on('store::message', function (message) {
    state.obmesh.add(message)
  })
  state.obmesh.db.watch('/mesh', function () {
    state.obmesh.db.get('/mesh', function (e, d) {
      if (!e && d && d[0]) state.current_index = d[0].value
      emitter.emit('render')
    })
  })
  // state.obmesh.on('update', function (k, v) {
  //   state.current_index = state.obmesh.history().map(function (i) {
  //     console.log('>>>>>>>>> ', i[0][1])
  //     return i[0][1]
  //   })
  // })
}
