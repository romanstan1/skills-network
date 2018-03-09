import seedData from './seed.js'
// const assets = (ctx => ctx.keys().map(ctx))(require.context('../../assets', true, /.*/))

const initialState = {
  allFilters: [
    {
      parentName: 'skillProficiency',
      active: true,
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
      active: false,
      filters: seedData.people
    },
    {
      parentName: 'skills',
      active: false,
      filters: seedData.skills
    }
  ],
  fullDetails: {
    open: false,
    name: "",
    currentSkills: []
  },
  people: seedData.people,
  skills: seedData.skills
}

function lookUpSkill(id) {
  return initialState.skills.filter(skill => skill.id === id)[0]
}

export default (state=initialState, action)=>{
  // console.log("action: ",action)
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

    default: return state
  }
}

function mapNewFilters(filters, filterName) {
  return filters.map(filter =>
    filter.name === filterName?
    {...filter,
      active: !filter.active
    }
  : filter)
}
