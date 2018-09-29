import { handleActions } from 'redux-actions'
import { SETPAGE,SETADDRESS } from '../types/common'



export default handleActions({
    [SETPAGE] (state,action) {
      return {
        ...state,
        page: action.payload
      }
    },
    [SETADDRESS] (state,action) {
      return {
        ...state,
        address: action.payload
      }
    }
  }, {
    page: 1,
    address:0
  })