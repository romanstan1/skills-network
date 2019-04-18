import {AUTH} from "store/constants"

export const logOut = () => (dispatch) =>
  dispatch({type: AUTH.LOG_OUT})

export const logInSuccessful = (user) => (dispatch) =>
  dispatch({
    type: AUTH.LOG_IN_SUCCESSFUL,
    payload: user
  })

export const notLoggedIn = () => (dispatch) =>
  dispatch({
    type: AUTH.NOT_LOGGED_IN
  })

export const updateUserData = (data) => (dispatch) =>
  dispatch({
    type: AUTH.UPDATE_USER_DATA,
    payload: data
  })
