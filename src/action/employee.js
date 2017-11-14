import superagent from 'superagent';

export const set = (employee) => ({
  type: 'EMPLOYEE_SET',
  payload:,
})

//create employee should come from admin reducer??

export const fetch = () => (store) => {
  let { token } = store.getState()
  return superagent.get(`${__API_URL__}/employees/me`)
  .set('Authorization', `Bearer ${ token }`)
  .then(response => {
    return store.dispatch(set(response.body))
  })
}

// export const update = (employee) => (store) => {
//   let { token } = store.getState()
//   return superagent.get(`${__API_URL__}/employees/${ user._id }`)
//   .set('Authorization', `Bearer ${ token }`)
//   .then(response => {
//     return store.dispatch(set(response.body))
//   })
// }
