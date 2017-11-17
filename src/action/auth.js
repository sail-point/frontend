import superagent from 'superagent'
import * as util from '../lib/util.js'
window.util = util
export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
})

export const tokenRemove = () => ({
  type: 'TOKEN_REMOVE',
})

export const logout = () => {
  util.cookieDelete('X-SailPoint-Token')
  return tokenRemove()
}

export const signup = (user) => (store) => {
  return superagent.post(`${__API_URL__}/admin/signup`)
    .send(user)
    .withCredentials()
    .then(response => {
      console.log('SIGNUP ::', { response })
      util.cookieCreate('X-SailPoint-Token', response.body.token, 7)
      return store.dispatch(tokenSet(response.body.token))
    })
}

export const login = (user) => (store) => {
  return superagent.get(`${__API_URL__}/admin/login`)
    .auth(user.email, user.password)
    .withCredentials()
    .then(response => {
      console.log('ADMIN_LOGIN ::', { response })
      util.cookieCreate('X-SailPoint-Token', response.body.token, 7)
      return store.dispatch(tokenSet(response.body.token))
    })
}
