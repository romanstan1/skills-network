import {peopleData, skillsData} from './seed.js'
// const assets = (ctx => ctx.keys().map(ctx))(require.context('../../assets', true, /.*/))

const uniqueLocations = [...new Set(peopleData.map(filter => filter.location))]
const uniqueClients = [...new Set(peopleData.map(filter => filter.client))]

const initialState = {
  allFilters: [
    {
      parentName: 'connections',
      active: true,
      minConnections: 0,
      filters: [
       {
         name: 'currentSkills',
         active: true
       },
       {
         name: 'desiredSkills',
         active: true
       }
     ]
    },
    {
      parentName: 'people',
      active: true,
      filters: peopleData,
      groupByList: ['all', 'location', 'clients'],
      uniqueLocations,
      uniqueClients
    },
    {
      parentName: 'skills',
      active: true,
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
      )
    }
    case 'CHANGE_MIN_CONNECTIONS': return {
      ...state,
      allFilters: state.allFilters.map((parent,index) =>
        index === 0? {
          ...parent,
          minConnections: action.payload
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
    default: return state
  }
}

function mapNewFilters(filters, filterName) { // returns array of all nodes in parent ie people or skill or connection
  return filters.map(filter =>
    filter.name === filterName?
    {...filter,
      active: !filter.active
    }
  : filter)
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
