export const validateProduct = (product) => {
  if(!product)
    throw new Error('product required')
  let {name} = product
  if(!name)
    throw new Error('__VALIDATION_ERROR__ invalid product')
}

export default (state=null, {type, payload}) => {
  switch(type){
    case 'PRODUCT_SET':
      validateProduct(payload)
      return payload
    case 'PRODUCT_CREATE':
      validateProduct(payload)
      return [payload, ...state]
    case 'PRODUCT_UPDATE':
      validateProduct(payload)
      return state.map(product => product.id ? payload : product)
    case 'PRODUCT_REMOVE':
      validateProduct(payload)
      return state.filter(product => product._id !== payload._id)
    default:
      return state
  }
}
