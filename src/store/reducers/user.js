import { handleActions } from 'redux-actions'
import { USERADD } from '../types/user'



export default handleActions({
    [USERADD] (state,action) {
      return {
        ...state,
        userinfo: action.payload
      }
    },
    
  }, {
    userinfo: {}
  })