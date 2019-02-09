import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import { MISC } from "./modules/constants"

export const history = createHistory()

console.log("MISC", MISC)

const enhancers = []
const logger = store => next => action => {
  let result = next(action)
  // console.log('action.type:', action.type)
  // console.log("store: ",store.getState().data)
  if (action.type === MISC.CLOSE_FULL_DETAILS ||
    action.type === MISC.OPEN_SKILL ||
    action.type === MISC.OPEN_PERSON ||
    action.type === MISC.TOGGLE_FULL_DETAILS) null
  else if (action.type !== MISC.CHECK_CONNECTION_FILTER && action.type !== MISC.UPDATE_NODES_AND_LINKS){
    store.dispatch({ type: MISC.CHECK_CONNECTION_FILTER })
    store.dispatch({ type: MISC.UPDATE_NODES_AND_LINKS })
  }

  return result
}

const middleware = [
  thunk,
  routerMiddleware(history),
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
