export const validateEmployee = (employee) => {
if(!employee)
  throw new Error('Invalid Employee PIN')
let { firstName, lastName, employee_id } = employee
}

export default (state=null, {type, payload}) => {
  switch(type){
    case 'EMPLOYEE_SET':
      validateEmployee(payload)
      return payload
    case 'TOKEN_REMOVE':
      return null
    default:
      return state
  }
}
