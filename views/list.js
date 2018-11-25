
var html = require('choo/html')
var css = require('sheetify')
var nav = require('../components/nav.js')
var debounce = require('lodash/debounce')

var prefix = css`
  :host {
    width: 100%;
    height: 300px;
    display: block;
    overflow: auto;
  }
`

module.exports = function view (state, emit) {

  var rowHeight = 110
  var tableHeight = 500
  var startRowIndex = Math.floor(state.scrollTop / rowHeight)
  var maxVisibleRows = Math.ceil(tableHeight / rowHeight) // round up
  var maxRowIndex = state.current_index.length - 1
  var endRowIndex = Math.min(maxRowIndex, startRowIndex + maxVisibleRows)
  var remainingRows = state.current_index.length - endRowIndex
  var rows = state.current_index.slice(startRowIndex, endRowIndex + 1)
  var topPadding = startRowIndex * rowHeight
  var bottomPadding = remainingRows * rowHeight
  var onScrollDebounced = debounce(onScroll, 25)

  // console.log({startRowIndex, endRowIndex, topPadding, bottomPadding})

  function onScroll (evt) {
    emit('scroll', evt.target.scrollTop)
  }

  function paddingRow (padding) {
    if (!padding) return ''

    return html`
      <tr style="height: ${padding}px">
        <td></td>
      </tr>
    `
  }

  function tableRow (item) {
    var _color = '#222'
    var sender = '----'
    return html`
    <tr>
      <li class="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
        <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
          <div class="dtc w2 w3-ns v-mid">
           <i class="fas fa-ghost" style="color: ${_color};"></i>
          </div>
          <div class="dtc v-mid pl3">
            <p><b style="font-size:0.7em;">[${item.timestamp}]</b> ---- ${item.message}</p>
          </div>
          <div class="dtc v-mid">
          </div>
        </article>
      </li>
    </tr>
    `
  }

  return html`
    <body>
      ${nav(state, emit)}
      <br />
      <main class="w-100 cf helvetica dark-gray bg-white pa3 pa4-m pa5-l mw9 center">
        <ul class="list pl0 measure center" style="max-width: 95%!important; height: 500px;">
          <table class="table ${prefix}" onscroll=${onScrollDebounced} style="height: 500px;">
            <tbody>
              ${paddingRow(topPadding)}
              ${rows.map(tableRow)}
              ${paddingRow(bottomPadding)}
            </tbody>
          </table>
        </ul>
      </main>
    </body>
  `
}
