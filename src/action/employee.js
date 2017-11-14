import superagent from 'superagent';

export const set = (employee) => ({
  type: 'EMPLOYEE_CREATE',
  payload: ///what is payload
})

export const fetch = (pin) => (store) => {
  let { token } = store.getState()
  return superagent.get(`${__API_URL__}/employees/pin/${employee.pin}`)
  .set('Authorization', `Bearer ${ token }`)
  .then(response => {
    return store.dispatch(set(response.body))
  })
}
