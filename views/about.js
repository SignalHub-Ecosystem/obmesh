
var html = require('choo/html')
var css = require('sheetify')
var nav = require('../components/nav.js')

module.exports = function (state, emit) {

  state.scrollTop = 0

  return html`
    <body>
      ${nav(state, emit)}
    <br /><br /><br />
    <div class="pa3 pa5-ns">
    <main class="cf w-100">
      <article class="cf ph3 ph5-ns pv5">
        <header class="fn fl-ns w-50-ns pr4-ns">
          <h1 class="f2 lh-title fw9 mb3 mt0 pt3 bt bw2">
            About OBMESH
          </h1>
        </header>
        <div class="fn fl-ns w-50-ns">
          <p class="f5 lh-copy measure mt0-ns">
            coming soon
          </p>
          <p class="f5 lh-copy measure">
            todo
          </p>
        </div>
      </article>
    </main>
    </div>
    <footer class="bg-near-black white-80 pv5 pv6-l ph4">
      <p class="f6"><span class="dib mr4 mr5-ns">OBMESH</span>
      </p>
    </footer>
    </body>
  `
}
