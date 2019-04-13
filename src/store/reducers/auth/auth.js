import {AUTH} from "store/constants"
import initialState from "./initialState"

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOG_IN_SUCCESSFUL: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: false,
        authPending: false
      }
    }
    case AUTH.NOT_LOGGED_IN: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        authPending: false
      }
    }
    case AUTH.LOG_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        authPending: false
      }
    }

    default: return state
  }
}
