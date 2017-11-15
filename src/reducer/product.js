export const validateProduct = (product) => {
  if(!product)
    throw new Error('product required')
  let {name, price} = product
  if(!name || !price)
    throw new Error('__VALIDATION_ERROR__ invalid product')
}

export const validateProducts = (product) => {
  if(!product)
    throw new Error('products required')
  if(!product.data || !product.count)
    throw new Error('__VALIDATION_ERROR__ invalid products')
}

const emptyState = {
  count: 0,
  data: [],
}

export default (state=emptyState, {type, payload}) => {
  let temp, tempArray
  switch(type){
    case 'PRODUCT_SET':
      validateProducts(payload)
      return payload
    case 'PRODUCT_CREATE':
      validateProduct(payload)
      temp = {...state}
      temp.count = state.count + 1
      temp.data = [...state.data, payload]
      return temp
    case 'PRODUCT_UPDATE':
      validateProduct(payload)
      temp = {...state}
      tempArray = state.data.map(product => product._id===payload._id ? payload : product)
      temp.data = tempArray
      return temp
    case 'PRODUCT_REMOVE':
      validateProduct(payload)
      temp = {...state}
      tempArray = state.data.filter(product => product._id !== payload._id)
      temp.count = state.count - 1
      temp.data = tempArray
      return temp
    case 'TOKEN_REMOVE':
      return emptyState
    default:
      return state
  }
}
