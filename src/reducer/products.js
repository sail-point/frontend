let emptyState = []

export const validateProduct = (product) => {
  if(!Product)
    throw new Error('Product required')
  let { productName, price } = product
  if(!productName || !price)
    throw new Error('Product requires a productName and a price');
}

export default(state=emptyState, { type, payload }) => {
  switch (type) {
    case 'PRODUCT_CREATE':
      validateProduct(payload)
      return [...state, payload]
    case 'PRODUCT_UPDATE':
      return state.map(item => item.id === payload.id ? payload : item)
    case 'PRODUCT_REMOVE':
      return state.filter(item => item.id !== payload.id)
    default:
      return state;
  }
}
