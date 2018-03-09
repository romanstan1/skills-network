import seedData from './seed.js'
// const assets = (ctx => ctx.keys().map(ctx))(require.context('../../assets', true, /.*/))

const initialState = {
  allFilters: [
    {
      parentName: 'people',
      filters: []
    },
    {
      parentName: 'skills',
      filters: []
    },
    {
      parentName: 'locations',
      filters: []
    },
    {
      parentName: 'roles',
      filters: []
    },
    {
      parentName: 'skillTypes',
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
    case 'TOGGLE_FILTER': return {
      ...state,
      allFilters: state.allFilters.map(parent =>
        parent.parentName === action.payload.parentName?
          { ...parent,
            filters: parent.filters.map(filter =>
              filter.name === action.payload.filterName?
              {
                ...filter,
                active: !filter.active
              } : filter
            )
          }
        :parent
      )
    }

    default: return state
  }
}
