import { rehydrateCookie } from '../lib/redux-persist.js'

let initialState = rehydrateCookie('X-SailPoint-token', null)
initialState = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiIwNzQxODAwNzU1YmUzMDUwODVmNGRlMTNiNGVjMjU4ZDk4ZjkzZjA0ZDkyNGYwZjc4YjQwNWRlZWExNzc2Nzg2NjU2MDU4MjdjNWUzNTQxNjk4ZmVkYTJhNTY0OTQyM2JhMjAzMjVmZmNmNzJjODY2Y2IxNDZlZDUyNTZhYWI5NSIsImlhdCI6MTUxMDcxODg3NSwiZXhwIjoxNTExMzIzNjc1fQ.HVJ69cGP7D0UJN8TtqNu1-EHymcBq-8ysEeWMh78tJ8'
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
