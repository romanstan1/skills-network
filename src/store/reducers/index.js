import {combineReducers} from "redux"
import {routerReducer} from "react-router-redux"
import data from "./visualise"

export default combineReducers({
  routing: routerReducer,
  data
})
