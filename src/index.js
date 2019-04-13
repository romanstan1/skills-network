// import React from "react"
// import {render} from "react-dom"
import "styles/index.css"
// // import {ConnectedRouter} from "react-router-redux"
// import {Provider} from "react-redux"
// import store, {history} from "store"
// import {Router} from "react-router-dom"

// // import './firebase-config.js'

// import App from "./App/App"


// render(
//   <Provider store={store}>
//     <Router history={history}>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById("root"),
// )


import React from 'react';
import { render } from 'react-dom'
import App, { history } from './App';
import { ConnectedRouter } from 'react-router-redux'
import store from './store'
import { Provider } from 'react-redux'

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));

// render(
//   <Provider store={store}>
//     <Router history={history}>
//       <App />
//     </Router>
//   </Provider>,
//   document.getElementById('root'),
// );
// {/* <ConnectedRouter history={history}> */}
// {/* </ConnectedRouter> */}
