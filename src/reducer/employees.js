
let emptyState = []

export const validateEmployee = (employee) => {
if(!employee)
  throw new Error('Employee required')
let { firstName, lastName, pin } = employee
if(!firstName || !lastName || !pin)
  throw new Error('Employee requires a pin, lastName and firstName')
}

export default(state=null, {type, payload}) => {
  switch(type){
    case 'EMPLOYEE_SET':
      validateEmployee(payload)
      return [...state, payload]
    case 'EMPLOYEE_UPDATE':
      return state.map(employee => employee_id === payload.id ? payload : item)
    case 'EMPLOYEE_REMOVE':
      return state.filter(employee => employee_id !== payload.id)
    default:
      return state
  }
}
