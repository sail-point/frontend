import {rehydrateCookie} from '../lib/redux-persist.js'

let initialState = rehydrateCookie('X-SailPoint-Token', null)

export default (state=initialState, {type, payload}) => {
  switch(type){
    case 'TOKEN_SET':
      return payload
    case 'TOKEN_REMOVE':
      return null
    default:
      return state
  }
}
