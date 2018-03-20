import { createStore, combineReducers } from 'redux'
import methodsReducer from '../reducers/methods'
export default () => {
  const store = createStore(
    combineReducers({
      method: methodsReducer
    }),
    /* istanbul ignore next */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  return store
}
