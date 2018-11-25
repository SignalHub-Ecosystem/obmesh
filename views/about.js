
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
          This is an experiment in open broadcast mesh systems. An open broadcast mesh is a shared data feed that holds information or references to other things. Use cases for this are aiming to be as generic as possible.
This experiment uses has a persistent data structure (shared across peers) called expiry-model based on scuttlebutt.
          </p>
          <p class="f5 lh-copy measure">
          Collaborators connected to this stream over WebRTC can freely add messages to the feed that currently expire after a day.
         There is also a node server peer that stores this data structure to disk as well maintaining a read-only view of the data inside a hyperdb instance. <br /><br />
            <a class="f6 link dim ba bw1 ph3 pv2 mb2 dib purple" href="https://github.com/m-onz/obmesh">CODE ON GITHUB</a>
          </p>
        </div>
      </article>
    </main>
    </div>
    <footer class="bg-near-black white-80 pv5 pv6-l ph4">
      <p class="f6"><span class="dib mr4 mr5-ns">OBMESH</span>
      <a class="f6 link dim ba bw1 ph3 pv2 mb2 dib purple" href="https://github.com/m-onz/obmesh">CODE ON GITHUB</a>
      </p>
    </footer>
    </body>
  `
}
