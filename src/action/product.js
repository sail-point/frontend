import superagent from 'superagent'

export const set = (products) => ({
  type: 'PRODUCT_SET',
  payload: products,
})

export const add = (product) => ({
  type: 'PRODUCT_CREATE',
  payload: product,
})

export const remove = (product) => ({
  type: 'PRODUCT_REMOVE',
  payload: product,
})

export const change = (product) => ({
  type: 'PRODUCT_UPDATE',
  payload: product,
})

export const create = (product) => (store) => {
  let {token} = store.getState()
  return superagent.post(`${__API_URL__}/products`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(product)
    .then(res => {
      return store.dispatch(add(res.body))
    })
}

export const update = (product) => (store) => {
  let {token} = store.getState()
  return superagent.put(`${__API_URL__}/products/${product._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send(product)
    .then(res => {
      return store.dispatch(change(res.body))
    })
}

export const fetch = () => (store) => {
  let {token} = store.getState()
  return superagent.get(`${__API_URL__}/products`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return store.dispatch(set(res.body))
    })
}

export const destroy = (product) => (store) => {
  let {token} = store.getState()
  return superagent.delete(`${__API_URL__}/products/${product._id}`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      return store.dispatch(remove(product))
    })
}
