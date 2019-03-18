import {clicked} from "components/D3ForceNetwork/D3_modules"
import {getData} from "store/api"
import {VISUALISE} from "store/constants"

export const updateScreenDimensions = () => {
  return (dispatch) => dispatch({
    type: VISUALISE.UPDATE_SCREEN_DIMENSIONS
  })
}

export const clickPerson = (node) => {
  return (dispatch) => dispatch({
    type: VISUALISE.OPEN_PERSON,
    payload: node
  })
}

export const clickSkill = (node) => {
  return (dispatch) => dispatch({
    type: VISUALISE.OPEN_SKILL,
    payload: node
  })
}

export const closeFullDetails = () => {
  return (dispatch) => dispatch({
    type: VISUALISE.CLOSE_FULL_DETAILS
  })
}

export const toggleFullDetails = () => {
  return (dispatch) => dispatch({
    type: VISUALISE.TOGGLE_FULL_DETAILS
  })
}

export const toggleFilter = (filterName, parentName) => {
  clicked()
  return (dispatch) => dispatch({
    type: VISUALISE.TOGGLE_FILTER,
    payload: {filterName, parentName}
  })
}

export const toggleSelectAllFilter = (parentName) => {
  clicked()
  return (dispatch) => dispatch({
    type: VISUALISE.TOGGLE_SELECT_ALL_FILTER,
    payload: parentName
  })
}

export const changeMinConnections = (value) => {
  clicked()
  return (dispatch) => dispatch({
    type: VISUALISE.CHANGE_MIN_CONNECTIONS,
    payload: value
  })
}

export const subGroupSelect = (subGroup) => {
  clicked()
  return (dispatch) => dispatch({
    type: VISUALISE.SUB_GROUP_SELECT,
    payload: subGroup
  })
}

export const changeDimension = () => {
  return (dispatch) => dispatch({
    type: VISUALISE.CHANGE_DIMENSION
  })
}

export function fetchSkillNetworkData() {
  return async(dispatch) => {
    const data = await getData()
    if (data === "Error") {
      return dispatch({
        type: VISUALISE.FETCH_SKILL_NETWORK_DATA_FAILURE
      })
    } else {
      return dispatch({
        type: VISUALISE.FETCH_SKILL_NETWORK_DATA,
        payload: {
          people: data[0],
          skills: data[1]
        }
      })
    }
  }
}
