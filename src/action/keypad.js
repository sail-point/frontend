import superagent from 'superagent'

export const set = (employee) => ({
  type: 'EMPLOYEE_SET',
  payload: employee,
})

export const login = (pin) => (store) => {
  // let {token} = store.getState()
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiI2Yjk4MjNmZWQwZjg5YjBjMGE4YTE5Zjc2OTE0NTdkZGI1NDEwOTBkNGQ5Yjc0YzJmMmQyOGMxODE4NzEzZGE0NGE4YzU0YmE3ODY1MzM4ZmQ1NGQ5YTZkNmY1YzlhYmUxZWMxODdlMmYyYTRhZjM3NDg4MTU3MDQ2M2QxMzM0ZSIsImlhdCI6MTUxMDY4NTgxNiwiZXhwIjoxNTExMjkwNjE2fQ.0W0exlx2pVqZUTtrsD1BiFV61kY_XQRux46TmydJDpg'
  return superagent.get(`${__API_URL__}/employees/pin/${pin}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}
