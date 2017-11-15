import superagent from 'superagent'

export const set = (employee) => ({
  type: 'EMPLOYEE_SET',
  payload: employee,
})

export const login = (pin) => (store) => {
  let {token} = store.getState()
  return superagent.get(`${__API_URL__}/employees/pin/${pin}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}
