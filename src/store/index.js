import {createStore, applyMiddleware, compose} from "redux"
// import {routerMiddleware} from "react-router-redux"
import thunk from "redux-thunk"
// import {createBrowserHistory} from "history"
import rootReducer from "store/reducers"
import {VISUALISE} from "store/constants"
import {routerMiddleware} from "react-router-redux"
import {history} from "App"
// import {browserHistory} from "react-router"

// import { createBrowserHistory } from 'history';

// export default createBrowserHistory();
// export const history = createBrowserHistory()
// export const history = syncHistoryWithStore(browserHistory, store)

const enhancers = []

// eslint-disable-next-line no-unused-vars
const logger = (store) => (next) => (action) => {
  const result = next(action)
  console.log("action.type:", action.type)
  // console.log("store data: ", store.getState().data)
  console.log("store auth: ", store.getState().auth)
  return result
}

const listener = (store) => (next) => (action) => {
  const result = next(action)

  // switch (action.type) {
  //   case VISUALISE.CLOSE_FULL_DETAILS:
  //   case VISUALISE.OPEN_SKILL:
  //   case VISUALISE.OPEN_PERSON:
  //   case VISUALISE.TOGGLE_FULL_DETAILS:
  //     break
  //   default:
  //     if (
  //       action.type !== VISUALISE.CHECK_CONNECTION_FILTER && action.type !== VISUALISE.UPDATE_NODES_AND_LINKS) {
  //       store.dispatch({type: VISUALISE.CHECK_CONNECTION_FILTER})
  //       store.dispatch({type: VISUALISE.UPDATE_NODES_AND_LINKS})
  //     }
  // }

  return result
}

const middleware = [
  thunk,
  routerMiddleware(history),
  listener,
  logger
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  composedEnhancers
)


// export const history = syncHistoryWithStore(browserHistory, store)

export default store
