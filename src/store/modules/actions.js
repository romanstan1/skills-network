
import {getData} from './api.js'

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
export const changeDimension = () => {
  return dispatch => dispatch({
    type: 'CHANGE_DIMENSION'
  })
}

export function fetchSkillNetworkData() {
  return async dispatch => {
    const data = await getData()
    return dispatch({
      type: 'FETCH_SKILL_NETWORK_DATA',
      payload: {
        people: data[0],
        skills:data[1]
      }
    })
  }
}
