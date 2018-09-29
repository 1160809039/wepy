import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import common from './common'
export default combineReducers({
  counter,
  user,
  common
})