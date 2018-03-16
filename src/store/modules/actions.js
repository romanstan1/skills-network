
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

export const changeMinConnections = (value) => {
  return dispatch => dispatch({
    type: 'CHANGE_MIN_CONNECTIONS',
    payload: value
  })
}

export const subGroupSelect = (subGroup) => {
  return dispatch => dispatch({
    type: 'SUB_GROUP_SELECT',
    payload: subGroup
  })
}

export function fetchSkillNetworkData() {
  return async dispatch => {
    try {
      const success = await fetch(`https://nameless-beyond-88288.herokuapp.com`)
      return dispatch({ type: 'FETCH_SKILL_NETWORK_DATA', payload: success });
    } catch (error) {
      console.log("error",error)
      return error
    }
  }
}


function sleep () {
  return new Promise((resolve) => {
    // wait 3s before calling fn(par)
    setTimeout(() => resolve(), 3000)
  })
}

function resolve() {
  return 10 + 18
}
