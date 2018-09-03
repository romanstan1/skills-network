import {
  cleanPeopleData,
  cleanSkillData,
  mapNewFilters,
  noOfOccurences,
  mapNewFiltersSubGroup,
  getParentState,
  constructForceNetwork,
  windowDimensions,
  lookUp } from './reducer_modules.js'

const initialState = {
  connections: {
    active: false,
    filters: [
     {
       name: 'currentSkills',
       active: false
     },
     {
       name: 'desiredSkills',
       active: false
     }
   ]
  },
  people: {
    active: false,
    minConnections: 0,
    filters: [],
    groupByList: ['all', 'location', 'clients'],
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
  dimension: '2D',
  failedData: false,
  links:[],
  nodes: [],
  width:  windowDimensions().width,
  height: windowDimensions().height
}

export default (state=initialState, action)=>{
  switch(action.type){
    case 'OPEN_PERSON': return {
      ...state,
      fullDetails: {
        ...state.fullDetails,
        open: true,
        type:'person',
        name: action.payload.name,
        currentSkills:action.payload.currentSkills.map(id => lookUp(id, state.skills.filters)).join(', '),
        desiredSkills:action.payload.desiredSkills.map(id => lookUp(id, state.skills.filters)).join(', '),
        location: action.payload.location,
        client: action.payload.client,
        startDate: action.payload.startDate,
        about: action.payload.about,
        linkedin: action.payload.linkedin,
        email: action.payload.email
      }
    }
    case 'OPEN_SKILL': return {
      ...state,
      fullDetails: {
        ...state.fullDetails,
        open: true,
        type:'skill',
        name: action.payload.name,
        hadBy: action.payload.hadBy.map(id => lookUp(id, state.people.filters)).join(', '),
        wantedBy: action.payload.wantedBy.map(id => lookUp(id, state.people.filters)).join(', ')
      }
    }
    case 'CLOSE_FULL_DETAILS': return {
      ...state,
      fullDetails: {
        ...state.fullDetails,
        open:false
      }
    }
    case 'UPDATE_SCREEN_DIMENSIONS': {
      const dimensions = windowDimensions()
      return {
        ...state,
        width:  dimensions.width,
        height: dimensions.height
      }
    }
    case 'TOGGLE_FULL_DETAILS': return {
      ...state,
      fullDetails: {
        ...state.fullDetails,
        hidden:!state.fullDetails.hidden
      }
    }
    case 'FETCH_SKILL_NETWORK_DATA_FAILURE': return {
      ...state,
      failedData: true
    }
    case 'TOGGLE_SELECT_ALL_FILTER': {
      const parentState = getParentState(action.payload, state)
      return {
        ...state,
        [action.payload]: {
          ...parentState,
          active: !parentState.active,
          filters: parentState.filters.map(filter => (
            { ...filter,
              active: !parentState.active
            })
          )
        }
      }
    }
    case 'TOGGLE_FILTER': {
      const {parentName, filterName} = action.payload
      const parentState = getParentState(parentName, state)
      const mappedNewFilters = mapNewFilters(parentState.filters, filterName)
      return {
        ...state,
        [parentName]: {
          ...parentState,
          active: mappedNewFilters.reduce((accumulator, filter) =>
            filter.active? accumulator: filter.active, true),
          filters: mappedNewFilters,
        }
      }
    }
    case 'CHANGE_MIN_CONNECTIONS': return {
      ...state,
      people: {
        ...state.people,
        minConnections: action.payload
      }
    }
    case 'CHANGE_DIMENSION': return {
      ...state,
      dimension: state.dimension !== '2D'? '2D' : '3D'
    }
    case 'CHECK_CONNECTION_FILTER': {
      const activeSkillIds = state.skills.filters
        .filter(skill => skill.active)
        .map(skill => skill.id)
      return {
        ...state,
        people: {
          ...state.people,
          filters: state.people.filters.map(filter => (
            {
              ...filter,
              workingConnections: noOfOccurences(filter, activeSkillIds),
              connectionFilterActive: noOfOccurences(filter, activeSkillIds) < state.people.minConnections
            }
          ))
        }
      }
    }
    case 'SUB_GROUP_SELECT': {
      const mappedNewFiltersSubGroup = mapNewFiltersSubGroup(state.people.filters, action.payload)
      return {
        ...state,
        people: {
          ...state.people,
          active: mappedNewFiltersSubGroup.reduce((accumulator, filter) =>
            filter.active? accumulator: filter.active, true),
          filters: mappedNewFiltersSubGroup
        }
      }
    }
    case 'FETCH_SKILL_NETWORK_DATA': {
      const peopleData = cleanPeopleData(action.payload.people)
      const skillsData = cleanSkillData(action.payload.skills, peopleData)
      return {
        ...state,
        failedData: false,
        people: {
          ...state.people,
          active: true,
          filters: peopleData,
          uniqueLocations: [...new Set(peopleData.map(filter => filter.location))],
          uniqueClients: [...new Set(peopleData.map(filter => filter.client))]
        },
        skills: {
          ...state.skills,
          active: true,
          filters: skillsData,
        },
        connections: {
          ...state.connections,
          active: false,
          filters: state.connections.filters.map(filter => (
            {...filter,active: false })
          )
        }
      }
    }
    case 'UPDATE_NODES_AND_LINKS': {
      const {nodes,links} = constructForceNetwork(state)
      return {
        ...state,
        nodes,
        links
      }
    }
    default: return state
  }
}
