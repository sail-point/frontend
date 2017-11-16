import superagent from 'superagent'

export const set = (employees) => ({
  type: 'EMPLOYEES_SET',
  payload: employees,
})

export const create = (employee) => ({
  type: 'EMPLOYEE_CREATE',
  payload: employee,
})

export const update = (employee) => ({
  type: 'EMPLOYEE_UPDATE',
  payload: employee,
})

export const destroy = (employee) => ({
  type: 'EMPLOYEE_DESTROY',
  payload: employee,
})

export const fetchAll = () => (store) => {
  let { token } = store.getState()
  return superagent.get(`${__API_URL__}/employees`)
  .set('Authorization', `Bearer ${ token }`)
  .then(response => {
    return store.dispatch(set(response.body.data))
  })
}

export const createRequest = (employee) => (store) => {
  console.log('employee: ', employee)
  let { token } = store.getState()
  console.log('{token}: ', {token})
  return superagent.post(`${__API_URL__}/employees`)
  .set('Authorization', `Bearer ${ token }`)
  .send(employee)
  .then(response => {
    return store.dispatch(create(response.body))
  })
}

export const updateRequest = (employee) => (store) => {
  console.log('employee: ', employee)
  console.log('store: ', store)
  let { token } = store.getState()
  return superagent.post(`${__API_URL__}/employees/${employee._id}`)
  .set('Authorization', `Bearer ${ token }`)
  .then(response => {
    return store.dispatch(update(response.body))
  })
}

export const destroyRequest = (employee) => (store) => {
  console.log('employee: ', employee)
  console.log('store: ', store)
  let {token} = store.getState()
  return superagent.delete(`${__API_URL__}/employees/${employee._id}`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    return store.dispatch(destroy(employee))
  })
}
