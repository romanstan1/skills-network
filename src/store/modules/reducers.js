import seedData from './seed.js'
// const assets = (ctx => ctx.keys().map(ctx))(require.context('../../assets', true, /.*/))

const initialState = {
  filters: {
  },
  fullDetails: {
    open: false,
    name: "",
    skills: []
  },
  people: seedData.people,
  skills: seedData.skills
}

function lookUpSkill(id) {
  return initialState.skills.filter(skill => skill.id === id)[0]
}

export default (state=initialState, action)=>{
  console.log("action: ",action)
  switch(action.type){
    case 'OPEN_PERSON': return {
      ...state,
      fullDetails: {
        ...state.fullDetails,
        open: true,
        type:'person',
        name: action.payload.name,
        skills: action.payload.skills.map(skillId =>
          lookUpSkill(skillId).name).join(', '),
        desired_skills: action.payload.desired_skills.map(skillId =>
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
        people_current: action.payload.people_current.join(', '),
        people_desired: action.payload.people_desired.join(', '),
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
    default: return state
  }
}
