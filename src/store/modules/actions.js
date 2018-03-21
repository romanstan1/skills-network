
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
      // const success = await fetch(`http://localhost:3000/skillsMatrix`)
      const success = await fetch(`https://damp-sands-22859.herokuapp.com`)

      // const success = await fetch(`http://localhost:3000/skillsMatrix`)
      // const success = await fetch(`https://infinite-mountain-98644.herokuapp.com`)
      const data = await success.json()
      // console.log("data",data)
      return dispatch({ type: 'FETCH_SKILL_NETWORK_DATA', payload: {people: data[0], skills:data[1] } });
    } catch (error) {
      console.log("error",error)
      return error
    }
  }
}
