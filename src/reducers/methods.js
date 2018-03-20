let methodsReducerDefaultState = 'MD5'
const methodsReducer = (state = methodsReducerDefaultState, action) => {
  switch (action.type) {
    case 'CHANGE_METHOD': {
      state = action.method
      return state
    }
    default: {
      return state
    }
  }
}
export default methodsReducer
