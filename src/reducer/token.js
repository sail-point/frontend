import {rehydrateCookie} from '../lib/redux-persist.js'

let initialState = rehydrateCookie('X-SailPoint-token', null)
initialState = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiI5ZjVhY2E0NjM0NDM3NmJjNmY0ODQ0YmZiZjBhYWZmZGFiYjY1NGU2YzIxMTQ0M2M2MDA0ODNkMjc1YmI1OTI2MDEzYjMzZTQ0ZjlkZjEwMzZkOGFkMjJjZWZmMDc5OTZkYzkyMmVlOTRkYmIwOTE4ZTNlNmJkNzU5MTQ2YWVlYiIsImlhdCI6MTUxMDcwMjc3NiwiZXhwIjoxNTExMzA3NTc2fQ.f8sdfHPfOZsBxwHTB7esamDenXO59kv1pFocBoKZuhU'
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
