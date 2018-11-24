
var Obmesh = require('../obmesh')

module.exports = function (state, emitter) {
  state.obmesh = Obmesh()
  if (!state.current_index) state.current_index = []
  emitter.on('store::message', function (message) {
    state.obmesh.add(message)
  })
  state.obmesh.on('update', function (k, v) {
    state.current_index = state.obmesh.history().map(function (i) {
      console.log('>>>>>>>>> ', i[0][1])
      return i[0][1]
    })
    emitter.emit('render')
  })
}
