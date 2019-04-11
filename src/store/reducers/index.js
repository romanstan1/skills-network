import {combineReducers} from "redux"
import {routerReducer} from "react-router-redux"
import data from "./visualise"
import auth from "./auth"

export default combineReducers({
  routing: routerReducer,
  data,
  auth
})
