import React from "react"
import {render} from "react-dom"
import "styles/index.css"
import {ConnectedRouter} from "react-router-redux"
import {Provider} from "react-redux"
import store, {history} from "store"
import App from "./App/App"

// import './firebase-config.js'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"))
