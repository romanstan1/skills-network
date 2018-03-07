
export const clickNode = (node) => {
  return dispatch => dispatch({
    type: 'CLICK_NODE',
    payload: node
  })
}

export const closeUserProfile = () => {
  return dispatch => dispatch({
    type: 'CLOSE_USER_PROFILE'
  })
}
