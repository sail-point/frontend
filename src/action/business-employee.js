import superagent from 'superagent'

export const set = (employees) => ({
  type: 'EMPLOYEES_SET',
  payload: employees,
})

export const create = (employee) => ({
  type: 'EMPLOYEE_CREATE',
  payload: employee,
})

export const remove = (employee) => ({
  type: 'EMPLOYEE_REMOVE',
  payload: employee,
})

export const fetchAllRequest = () => (store) => {
  let { token } = store.getState()
  return superagent.get(`${__API_URL__}/employees/`)
  .set('Authorization', `Bearer ${ token }`)
  .then(response => {
    return store.dispatch(set(response.body.data))
  })
}

export const createRequest = (employee) => (store) => {
  let { token } = store.getState()
  return superagent.get(`${__API_URL__}/employees/`)
  .set('Authorization', `Bearer ${ token }`)
  .then(response => {
    return store.dispatch(create(response.body.data))
  })
}

export const removeRequest = (employee) => (store) => {
  let {token} = store.getState()
  return superagent.delete(`${__API_URL__}/employees/${employee._id}`)
  .set('Authorization', `Bearer ${token}`)
  .then(res => {
    return store.dispatch(remove(employee))
  })
}
