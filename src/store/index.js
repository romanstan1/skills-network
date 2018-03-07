import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './modules'
import * as d3 from "d3";

export const history = createHistory()

const enhancers = []

console.log("d3",d3)

const logger = store => next => action => {
  let result = next(action)
  // console.log('STORE STATE:', store.getState(), action)
  // if(action.type !== 'LOAD_BLOG_POSTS') window.scrollTo(0, 0)
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
