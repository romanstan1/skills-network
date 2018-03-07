
// const assets = (ctx => ctx.keys().map(ctx))(require.context('../../assets', true, /.*/))





const initialState = {
  profile: {
    open: false,
    name: "",
    skills: []
  },
  people: [
    {"id": "001", type:"person", "name": "David Buckshaw", "location": "London", "skills":['11', '13', '14', '20'], "desired_skills":['12', '13'] },
    {"id": "002", type:"person", "name": "Sebastian Hoolson", "location": "Chichester", "skills":['11', '15', '16'], "desired_skills":['19'] },
    {"id": "003", type:"person", "name": "Miles Preston", "location": "London", "skills":['12', '13', '14'], "desired_skills":['12', '13'] },
    {"id": "004", type:"person", "name": "Edward Magloire", "location": "Mauritius", "skills":['12', '13', '15'], "desired_skills":['14', '13'] },
    {"id": "005", type:"person", "name": "Frank Countessdelo", "location": "Chichester", "skills":['12', '13', '17'], "desired_skills":['14', '19'] },
    {"id": "006", type:"person", "name": "Evan Geborand", "location": "London", "skills":['16', '17', '18'], "desired_skills":['14', '19'] },
    {"id": "007", type:"person", "name": "Roberto Champtercier", "location": "Sydney", "skills":['16', '17', '18'], "desired_skills":['14', '19'] },
    {"id": "008", type:"person", "name": "Dylan Cravatte", "location": "Sydney", "skills":['14', '17', '18'], "desired_skills":['11', '12'] },
    {"id": "009", type:"person", "name": "Jeremy Maguello", "location": "London", "skills":['15', '16', '17', '18', '19'], "desired_skills":['12', '18'] },
  ],
  skills: [
    {"id": "11",  type:"skill", "name": "Python"},
    {"id": "12",  type:"skill", "name": "AngularJS" },
    {"id": "13",  type:"skill", "name": "Angular2" },
    {"id": "14",  type:"skill", "name": "React" },
    {"id": "15",  type:"skill", "name": "Drupal 7" },
    {"id": "16",  type:"skill", "name": "Pottery" },
    {"id": "17",  type:"skill", "name": "Line Dancing" },
    {"id": "18",  type:"skill", "name": "UX Design" },
    {"id": "19",  type:"skill", "name": "Rugby" },
    {"id": "20",  type:"skill", "name": "Digital Marketing" }
  ],
  nodes: [
    {"id": "Myriel", "group": 1},
    {"id": "Napoleon", "group": 1},
    {"id": "Mlle.Baptistine", "group": 1},
    {"id": "Mme.Magloire", "group": 1},
    {"id": "CountessdeLo", "group": 1},
    {"id": "Geborand", "group": 1},
    {"id": "Champtercier", "group": 1},
    {"id": "Cravatte", "group": 1},
    {"id": "Count", "group": 1},
    {"id": "OldMan", "group": 1},
    {"id": "Labarre", "group": 2},
    {"id": "Valjean", "group": 2},
    {"id": "Marguerite", "group": 3},
    {"id": "Mme.deR", "group": 2},
    {"id": "Isabeau", "group": 2},
    {"id": "Gervais", "group": 2},
    {"id": "Tholomyes", "group": 3},
    {"id": "Listolier", "group": 3},
    {"id": "Fameuil", "group": 3},
    {"id": "Blacheville", "group": 3},
    {"id": "Favourite", "group": 3},
    {"id": "Dahlia", "group": 3},
    {"id": "Zephine", "group": 3}
  ],
  links: [
    {"source": "Napoleon", "target": "Myriel", "value": 1},
    {"source": "Mlle.Baptistine", "target": "Myriel", "value": 8},
    {"source": "Mme.Magloire", "target": "Myriel", "value": 10},
    {"source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6},
    {"source": "CountessdeLo", "target": "Myriel", "value": 1},
    {"source": "Geborand", "target": "Myriel", "value": 1},
    {"source": "Champtercier", "target": "Myriel", "value": 1},
    {"source": "Cravatte", "target": "Myriel", "value": 1},
    {"source": "Count", "target": "Myriel", "value": 2},
    {"source": "OldMan", "target": "Myriel", "value": 1},
    {"source": "Valjean", "target": "Labarre", "value": 1},
    {"source": "Valjean", "target": "Mme.Magloire", "value": 3},
    {"source": "Valjean", "target": "Mlle.Baptistine", "value": 3},
    {"source": "Valjean", "target": "Myriel", "value": 5},
    {"source": "Marguerite", "target": "Valjean", "value": 1},
    {"source": "Mme.deR", "target": "Valjean", "value": 1},
    {"source": "Isabeau", "target": "Valjean", "value": 1},
    {"source": "Gervais", "target": "Valjean", "value": 1},
    {"source": "Listolier", "target": "Tholomyes", "value": 4},
    {"source": "Fameuil", "target": "Tholomyes", "value": 4}
  ]
}

export default (state=initialState, action)=>{
  console.log("action: ",action)
  switch(action.type){
    case 'CLICK_NODE': return {
      ...state,
      profile: {
        ...state.profile,
        open:true,
        name: action.payload.name,
        skills: action.payload.skills.join(' '),
        desired_skills: action.payload.desired_skills.join(' '),
        location: action.payload.location
      }
    }
    case 'CLOSE_USER_PROFILE': return {
      ...state,
      profile: {
        ...state.profile,
        open:false
      }
    }
    default: return state
  }
}
