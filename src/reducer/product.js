export const validateProduct = (product) => {
  if(!product)
    throw new Error('product required')
  let {name} = product
  if(!name)
    throw new Error('__VALIDATION_ERROR__ invalid product')
}

let emptyState = {
  count: 0,
  data: [],
}

export default (state=emptyState, {type, payload}) => {
  let temp
  switch(type){
    case 'PRODUCT_SET':
      return payload
    case 'PRODUCT_CREATE':
      validateProduct(payload)
      state.data.push(payload)
      return state
    case 'PRODUCT_UPDATE':
      validateProduct(payload)
      temp = state.data.map(product => product._id===payload._id ? payload : product)
      state.data = temp
      return state
    case 'PRODUCT_REMOVE':
      validateProduct(payload)
      temp = state.data.filter(product => product._id !== payload._id)
      state.data = temp
      return state
    default:
      return state
  }
}
