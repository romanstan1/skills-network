
export const clickPerson = (node) => {
  return dispatch => dispatch({
    type: 'OPEN_PERSON',
    payload: node
  })
}

export const clickSkill = (node) => {
  return dispatch => dispatch({
    type: 'OPEN_SKILL',
    payload: node
  })
}

export const closeProfile = () => {
  return dispatch => dispatch({
    type: 'CLOSE_PROFILE'
  })
}
