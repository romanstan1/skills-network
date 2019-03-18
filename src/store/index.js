import {createStore, applyMiddleware, compose} from "redux"
import {routerMiddleware} from "react-router-redux"
import thunk from "redux-thunk"
import createHistory from "history/createBrowserHistory"
import rootReducer from "./reducers"
import {VISUALISE} from "./constants/visualise"

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
    case VISUALISE.CLOSE_FULL_DETAILS:
    case VISUALISE.OPEN_SKILL:
    case VISUALISE.OPEN_PERSON:
    case VISUALISE.TOGGLE_FULL_DETAILS:
      break
    default:
      if (
        action.type !== VISUALISE.CHECK_CONNECTION_FILTER && action.type !== VISUALISE.UPDATE_NODES_AND_LINKS) {
        store.dispatch({type: VISUALISE.CHECK_CONNECTION_FILTER})
        store.dispatch({type: VISUALISE.UPDATE_NODES_AND_LINKS})
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
