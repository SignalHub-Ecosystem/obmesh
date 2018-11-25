
var html = require('choo/html')
var css = require('sheetify')
var nav = require('../components/nav.js')

module.exports = function (state, emit) {

  function onsubmit (e) {
    e.preventDefault()
    var form = e.currentTarget
    var body = new FormData(form)
    emit('message::obmesh', {
      message: body.get('message'),
      timestamp: new Date().toISOString()
    })
    emit('pushState', '/')
  }

  function onprivatesubmit (e) {
    e.preventDefault()
    var form = e.currentTarget
    var body = new FormData(form)
    console.log('private channel> ', body.get('private_channel'), body.get('readonly_channel'))
    emit('refresh::obmesh', body.get('private_channel'), body.get('readonly_channel'))
    emit('render')
    alert('successfully set the private channel to ::'+state.obmesh_channel)
  }

  function change_mesh (e) {
    e.preventDefault()
    state.obmesh_channel = ''
    emit('render')
  }

  function form (show) {
    if (show) {
    return html`
    <article class="cf ph3 ph5-ns pv5">
      <header class="fn fl-ns w-50-ns pr4-ns">
        <h1 class="f2 lh-title fw9 mb3 mt0 pt3 bt bw2">
          Make a broadcast :: [${state.obmesh_channel}]
        </h1>
      </header>
      <br /><br />
      <div class="fn fl-ns w-50-ns">
      <a class="f6 link dim ba bw1 ph3 pv2 mb2 dib purple" href="#!" onclick=${change_mesh}>CHANGE MESH</a>
      <form id="broadcast" onsubmit=${onsubmit} class="measure center">
        <legend class="f4 fw6 ph0 mh0">Broadcast</legend>
        <label for="message" class="db fw6 lh-copy f6">
          Message
        </label>
        <input id="message" name="message"
          class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
          type="text"
          pattern=".{1,32}"
          required>
          <br/><br/>
        <input type="submit" value="Broadcast"
          class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">
      </form>
      </div>
    </article>
    `
    } else {
      return html`
      <article class="cf ph3 ph5-ns pv5">
        <header class="fn fl-ns w-50-ns pr4-ns">
          <h1 class="f2 lh-title fw9 mb3 mt0 pt3 bt bw2">
            You need to set the private mesh channel to broadcast.
          </h1>
          <form id="private" onsubmit=${onprivatesubmit} class="measure center">
            <legend class="f4 fw6 ph0 mh0">Colloborate</legend>
            <label for="private_channel" class="db fw6 lh-copy f6">
              Private channel
            </label>
            <input id="private_channel" name="private_channel"
              class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              pattern=".{1,64}"
              required>
              <br/><br/>
              <label for="readonly" class="db fw6 lh-copy f6">
                Read only channel
              </label>
              <input id="readonly" name="readonly"
                type="text"
                required
                pattern=".{1,64}"
                title="Read only channel must be between 1 and 64 characters long."
                class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              ><br/><br/>
            <input type="submit" value="Set the private mesh channel"
             class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">
          </form>
        </header>
        </article>
      `
    }
  }

  state.scrollTop = 0

  return html`
    <body>
      ${nav(state, emit)}
    <br /><br /><br />
    <div class="pa3 pa5-ns">
    <main class="cf w-100">
      ${form (state.obmesh_channel)}
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
