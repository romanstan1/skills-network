import {
  windowDimensions
} from "./reducer_modules.js"

const initialState = {
  connections: {
    active: false,
    filters: [
      {
        name: "currentSkills",
        active: false
      },
      {
        name: "desiredSkills",
        active: false
      }
    ]
  },
  people: {
    active: false,
    minConnections: 0,
    filters: [],
    groupByList: ["all", "location", "clients"],
    uniqueLocations: [],
    uniqueClients: []
  },
  skills: {
    active: false,
    filters: []
  },
  fullDetails: {
    open: false,
    hidden: false,
    name: "",
    currentSkills: []
  },
  dimension: "2D",
  failedData: false,
  links: [],
  nodes: [],
  width: windowDimensions().width,
  height: windowDimensions().height
}

export default initialState
