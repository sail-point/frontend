import superagent from 'superagent'

export const set = (orders) => ({
  type: 'ORDER_SET',
  payload: orders,
})

export const add = (order) => ({
  type: 'ORDER_CREATE',
  payload: order,
})

export const paid = (order) => ({
  type: 'ORDER_CLOSE',
  payload: order,
})

export const create = (order) => (store) => {
  let {token} = store.getState()
  return superagent.post(`${__API_URL__}/orders`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(order)
    .then(res => {
      return store.dispatch(add(res.body))
    })
}

export const close = (order) => (store) => {
  let {token} = store.getState()
  return superagent.put(`${__API_URL__}/orders/${order._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(order)
    .then(res => {
      return store.dispatch(paid(res.body))
    })
}

export const fetch = () => (store) => {
  let {token} = store.getState()
  return superagent.get(`${__API_URL__}/orders`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}
