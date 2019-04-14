import {combineReducers} from "redux"
// import {routerReducer} from "react-router-redux"
import {connectRouter} from "connected-react-router"
import data from "./visualise"
import auth from "./auth"

const rootReducer = (history) => combineReducers({
  data,
  auth,
  router: connectRouter(history)
})

export default rootReducer


// import { combineReducers } from 'redux'
// import { connectRouter } from 'connected-react-router'
// import counterReducer from './counter'

// const rootReducer = (history) => combineReducers({
//   count: counterReducer,
//   router: connectRouter(history)
// })

// export default rootReducer


// import { combineReducers } from 'redux'

// export default (history) => combineReducers({
//   router: connectRouter(history),
//   ... // rest of your reducers
// })
