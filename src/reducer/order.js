export const validateOrder = (order) => {
  if(!order)
    throw new Error('order required')
}

export const validateOrders = (order) => {
  if(!order)
    throw new Error('orders required')
  if(!order.data || order.count === undefined)
    throw new Error('__VALIDATION_ERROR__ invalid orders')
}

const emptyState = {
  count: 0,
  data: [],
}

export default (state=emptyState, {type, payload}) => {
  let temp, tempArray
  switch(type){
    case 'ORDER_SET':
      validateOrders(payload)
      return payload
    case 'ORDER_CREATE':
      validateOrder(payload)
      temp = {...state}
      temp.count = state.count + 1
      temp.data = [...state.data, payload]
      return temp
    case 'ORDER_CLOSE':
      validateOrder(payload)
      temp = {...state}
      tempArray = state.data.map(order => order._id===payload._id ? payload : order)
      temp.data = tempArray
      return temp
    case 'TOKEN_REMOVE':
      return emptyState
    default:
      return state
  }
}
