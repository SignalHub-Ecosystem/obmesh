//
var html = require('choo/html')
var css = require('sheetify')

module.exports = function (state, emit) {
  return html`
  <header class="bg-black-90 fixed w-100 ph3 pv3 pv4-ns ph4-m ph5-l" style="z-index:99999;">
    <nav class="f6 fw6 ttu tracked">
      <a class="link dim white dib mr3" href="/" title="home">OBMESH <i class="fas fa-broadcast-tower"></i></a>
      <a class="link dim white dib mr3 fr" href="/about" title="about">ABOUT</a>
    </nav>
  </header>
  `
}
