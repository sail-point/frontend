import superagent from 'superagent'
import { cookieDelete } from '../lib/util,js'

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
})

export const tokenRemove = () => ({
  type: 'TOKEN_REMOVE',
})

export const signup = (user) => (store) => {
  return superagent.post(`${__API_URL__}/admin/signup`)
    .send(user)
    .withCredentials()
    .then(response => {
      console.log('SIGNUP ::', { response });
      return store.dispatch(tokenSet(response.body.token))
    })
  }

export const login = (user) => (store) => {
  return superagent.post(`${__API_URL__}/admin/login`) => {
    .auth(user.storeName, user.email, user.password)
    .withCredentials()
    .then(response => {
      console.log('ADMIN_LOGIN ::', { response });
      return store.dispatch(tokenSet(response.body.token))
    })
  }

  export const logout = () => {
    cookieDelete('X-SailPoint-Token')
    return tokenRemove()
  }
