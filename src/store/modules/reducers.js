import {peopleData, skillsData} from './seed.js'
// const assets = (ctx => ctx.keys().map(ctx))(require.context('../../assets', true, /.*/))

const uniqueLocations = [...new Set(peopleData.map(filter => filter.location))]
const uniqueClients = [...new Set(peopleData.map(filter => filter.client))]

const initialState = {
  allFilters: [
    {
      parentName: 'connections',
      active: false,
      // minConnections: 0,
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
    {
      parentName: 'people',
      active: false,
      minConnections: 0, // swap with
      filters: peopleData,
      groupByList: ['all', 'location', 'clients'],
      uniqueLocations,
      uniqueClients
    },
    {
      parentName: 'skills',
      active: false,
      filters: skillsData
    }
  ],
  fullDetails: {
    open: false,
    hidden: false,
    name: "",
    currentSkills: []
  },
  people: peopleData,
  skills: skillsData
  // people: [],
  // skills: []
}

export function lookUpSkill(id) {
  return initialState.skills.filter(skill => skill.id === id)[0]
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
        currentSkills: action.payload.currentSkills.map(skillId =>
          lookUpSkill(skillId).name).join(', '),
        desiredSkills: action.payload.desiredSkills.map(skillId =>
          lookUpSkill(skillId).name).join(', '),
        location: action.payload.location
      }
    }
    case 'OPEN_SKILL': return {
      ...state,
      fullDetails: {
        ...state.fullDetails,
        open: true,
        type:'skill',
        peopleCurrent: action.payload.peopleCurrent.join(', '),
        peopleDesired: action.payload.peopleDesired.join(', '),
        name: action.payload.name,
      }
    }
    case 'CLOSE_FULL_DETAILS': return {
      ...state,
      fullDetails: {
        ...state.fullDetails,
        open:false
      }
    }
    case 'TOGGLE_FULL_DETAILS': return {
      ...state,
      fullDetails: {
        ...state.fullDetails,
        hidden:!state.fullDetails.hidden
      }
    }
    case 'TOGGLE_SELECT_ALL_FILTER': return {
      ...state,
      allFilters: state.allFilters.map(parent =>
        parent.parentName === action.payload?
          { ...parent,
            active: !parent.active,
            filters: parent.filters.map(filter => {
              return {
                ...filter,
                active: !parent.active
              }}
            )
          }
        :parent
      )
    }
    case 'TOGGLE_FILTER': return {
      ...state,
      allFilters: state.allFilters.map(parent =>
        parent.parentName === action.payload.parentName?
          { ...parent,
            active: mapNewFilters(parent.filters, action.payload.filterName)
              .reduce((accumulator, filter) => filter.active? accumulator: filter.active, true),
            filters: mapNewFilters(parent.filters, action.payload.filterName),
          }
        :parent
        // :parent.parentName === action.payload.parentName?
      )
    }
    case 'CHANGE_MIN_CONNECTIONS': return {
      ...state,
      allFilters: state.allFilters.map(parent =>
        parent.parentName === 'people'? {
          ...parent,
          minConnections: action.payload
        } : parent)
    }
    case 'CHECK_CONNECTION_FILTER':

    const skillFilters = state.allFilters
      .filter(parent => parent.parentName === 'skills')[0].filters
      .filter(skill => skill.active)
      .map(skill => skill.id)

    return {
      ...state,
      allFilters: state.allFilters.map((parent,index) =>
        parent.parentName === 'people'? {
          ...parent,
          filters: parent.filters.map(filter => {
            return {...filter,
              workingConnections:noOfOccurences(filter, skillFilters),
              connectionFilterActive: noOfOccurences(filter, skillFilters) < parent.minConnections
            }
          })
        } : parent)
    }
    case 'SUB_GROUP_SELECT': return {
      ...state,
      allFilters: state.allFilters.map(parent =>
        parent.parentName === 'people'?
          { ...parent,
            active: mapNewFiltersSubGroup(parent.filters, action.payload)
              .reduce((accumulator, filter) => filter.active? accumulator: filter.active, true),
            filters: mapNewFiltersSubGroup(parent.filters, action.payload),
          }
        :parent
      )
    }
    case 'FETCH_SKILL_NETWORK_DATA':
    console.log("action: ",action.payload)
    return {
      ...state,
      // people: peopleData,
      // skills: skillsData,
      // allFilters: state.allFilters.map(parent => {
      //   return {
      //     ...parent,
      //     active: true,
      //     filters: parent.filters.map(filter => filter.active === true)
      //   }
      // })
    }
    default: return state
  }
}

function mapNewFilters(filters, filterName) { // returns array of all nodes in parent ie people or skill or connection
  return filters.map(filter =>
    filter.name === filterName?
    {...filter,
      active: !filter.active // finds the individual filter, and reverses its state.
    }
  : filter)
}

function noOfOccurences(personNode, skillFilters) {
  let workingConnections = 0
  personNode.currentSkills.forEach(skillId => {
    if(skillFilters.includes(skillId)) workingConnections++
  })
  return workingConnections
}


function mapNewFiltersSubGroup(filters, subGroup) {
  const subGroupFilters = filters.filter(filter => filter.location === subGroup || filter.client === subGroup)
  const subGroupFiltersAllOpen = subGroupFilters.map(filter => filter.active).includes(false)
  return filters.map(filter =>
    filter.location === subGroup || filter.client === subGroup?
    {...filter,
      active: subGroupFiltersAllOpen // Are ALL of the filters within a subgroup selected? Boolean
    }
  : filter)
}
