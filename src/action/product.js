import superagent from 'superagent'

export const set = (product) => ({
  type: 'PRODUCT_SET',
  payload: product,
})

export const remove = (product) => ({
  type: 'PRODUCT_REMOVE',
  payload: product,
})

export const create = (product) => (store) => {
  let {token} = store.getState
  return superagent.post(`${__API_URL__}/admin/products`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(product)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}

export const update = (product) => (store) => {
  let {token} = store.getState()
  return superagent.put(`${__API_URL__}/admin/products/${product._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(product)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}
