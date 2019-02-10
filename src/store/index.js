import {createStore, applyMiddleware, compose} from "redux"
import {routerMiddleware} from "react-router-redux"
import thunk from "redux-thunk"
import createHistory from "history/createBrowserHistory"
import rootReducer from "./modules"
import {MISC} from "./modules/constants"

export const history = createHistory()

const enhancers = []

// eslint-disable-next-line no-unused-vars
const logger = (store) => (next) => (action) => {
  const result = next(action)
  // console.log('action.type:', action.type)
  // console.log("store: ",store.getState().data)
  return result
}

const listener = (store) => (next) => (action) => {
  const result = next(action)

  switch (action.type) {
    case MISC.CLOSE_FULL_DETAILS:
    case MISC.OPEN_SKILL:
    case MISC.OPEN_PERSON:
    case MISC.TOGGLE_FULL_DETAILS:
      break
    default:
      if (
        action.type !== MISC.CHECK_CONNECTION_FILTER && action.type !== MISC.UPDATE_NODES_AND_LINKS) {
        store.dispatch({type: MISC.CHECK_CONNECTION_FILTER})
        store.dispatch({type: MISC.UPDATE_NODES_AND_LINKS})
      }
  }

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

export default store
