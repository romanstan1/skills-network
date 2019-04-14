import "styles/index.css"
// import React from "react"
// import {render} from "react-dom"
// import {Provider} from "react-redux"
// // import {ConnectedRouter} from "react-router-redux"
// import {ConnectedRouter} from "connected-react-router"
// import App, {history} from "./App"
// import store from "./store"

// render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <App />
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById("root"))
import {Provider} from "react-redux"
import React from "react"
import {render} from "react-dom"
import App from "./App"
import configureStore, {history} from "./store"

const store = configureStore()

render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
)
