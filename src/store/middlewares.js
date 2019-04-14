// import { VISUALISE } from "store/constants"

export const logger = (store) => (next) => (action) => {
  const result = next(action)
  console.log("action.type:", action.type)
  // console.log("store data: ", store.getState().data)
  console.log("store auth: ", store.getState().auth)
  return result
}

export const listener = () => (next) => (action) => {
  const result = next(action)

  // switch (action.type) {
  //   case VISUALISE.CLOSE_FULL_DETAILS:
  //   case VISUALISE.OPEN_SKILL:
  //   case VISUALISE.OPEN_PERSON:
  //   case VISUALISE.TOGGLE_FULL_DETAILS:
  //     break
  //   default:
  //     if (
  //       action.type !== VISUALISE.CHECK_CONNECTION_FILTER && action.type !== VISUALISE.UPDATE_NODES_AND_LINKS) {
  //       store.dispatch({type: VISUALISE.CHECK_CONNECTION_FILTER})
  //       store.dispatch({type: VISUALISE.UPDATE_NODES_AND_LINKS})
  //     }
  // }

  return result
}
