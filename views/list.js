
var html = require('choo/html')
var css = require('sheetify')
var debounce = require('lodash/debounce')
var nav = require('../components/nav.js')

var prefix = css`
  :host {
    width: 100%;
    height: 300px;
    display: block;
    overflow: auto;
  }
`

module.exports = function view (state, emit) {
  var rows = state.current_index
  if (rows.length > 999) rows = rows.slice(0, 999)
  return html`
    <body>
      ${nav(state, emit)}
      <br /><br /><br /><br />
      <main class="w-100 cf helvetica dark-gray bg-white pa3 pa4-m pa5-l mw9 center">
      <a class="f6 link dim ba bw1 ph3 pv2 mb2 dib purple" href="/broadcast">Make a broadcast</a>
        <ul class="list pl0 measure center" style="max-width: 95%!important;">
          <table class="table ${prefix}">
            <tbody>
              ${rows.map(tableRow)}
            </tbody>
          </table>
        </ul>
      </main>
    </body>
  `

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
            <p><b style="font-size:0.7em;">[${item.timestamp}]</b>   ----  ${item.nick}</p>
          </div>
          <div class="dtc v-mid">
          </div>
        </article>
      </li>
    </tr>
    `
  }
}
