
// const assets = (ctx => ctx.keys().map(ctx))(require.context('../../assets', true, /.*/))

const initialState = {
  people: [],
  skills: []
}

export default (state=initialState, action)=>{
  switch(action.type){
    case 'SELECT_CHAPTER': return {
      ...state,
      selectedChapter: action.payload
    }
    default: return state
  }
}
