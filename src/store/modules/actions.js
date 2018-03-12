
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

export const closeFullDetails = () => {
  return dispatch => dispatch({
    type: 'CLOSE_FULL_DETAILS'
  })
}
export const toggleFullDetails = () => {
  return dispatch => dispatch({
    type: 'TOGGLE_FULL_DETAILS'
  })
}

export const toggleFilter = (filterName, parentName) => {
  return dispatch => dispatch({
    type: 'TOGGLE_FILTER',
    payload: {filterName, parentName}
  })
}
export const toggleSelectAllFilter = (parentName) => {
  return dispatch => dispatch({
    type: 'TOGGLE_SELECT_ALL_FILTER',
    payload: parentName
  })
}
