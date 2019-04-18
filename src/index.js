import React from "react"
import {Provider} from "react-redux"
import {render} from "react-dom"

import App from "./App"
import store, {history} from "./store"

import "styles/index.css"

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
)
