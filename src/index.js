import React from "react"
import {render} from "react-dom"
import "./styles/index.css"
import {ConnectedRouter} from "react-router-redux"
import {Provider} from "react-redux"
import createBrowserHistory from "history/createBrowserHistory"
import store from "./store"
import App from "./App"
// import './firebase-config.js'

const history = createBrowserHistory()
render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"))
