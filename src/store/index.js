import {createBrowserHistory} from "history"
import {applyMiddleware, compose, createStore} from "redux"
import {routerMiddleware} from "connected-react-router"
import thunk from "redux-thunk"
import {logger, listener} from "./middlewares"
import createRootReducer from "./reducers"

export const history = createBrowserHistory()

const middleware = [
  thunk,
  routerMiddleware(history),
  listener,
  logger
]

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(...middleware),
    ),
  )
  return store
}
