export const validateEmployee = (employee) => {
  if(!employee)
    throw new Error('Employee required')
  let { firstName, lastName, title, email, phoneNumber, hoursPerWeek, salaryPerHour, pin } = employee
  if(!firstName || !lastName || !title || !email || !phoneNumber || !hoursPerWeek || !salaryPerHour|| !pin )
    throw new Error('Employee requires a first name, last name, title, email, phone number, hours-per-week, salary-per-hour, and pin')
}

let emptyState = []

export default (state=emptyState, {type, payload}) => {
  switch(type){
    case 'EMPLOYEE_CREATE':
      validateEmployee(payload)
      return [payload, ...state]
    case 'EMPLOYEES_SET':
      if(!Array.isArray(payload))
        throw new Error('employees must be an array')
      payload.forEach(validateEmployee)
      return payload
    case 'EMPLOYEE_UPDATE':
      validateEmployee(payload)
      return state.map(employee => employee._id === payload._id ? payload : employee)
    case 'EMPLOYEE_DESTROY':
      validateEmployee(payload)
      return state.filter(employee => employee._id !== payload.id)
    case 'TOKEN_REMOVE':
      return emptyState
    default:
      return state
  }
}
