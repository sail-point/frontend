export const validateEmployee = (employee) => {
  if(!employee)
    throw new Error('Employee required')
  let { firstName, lastName, title, email, phoneNumber, hoursPerWeek, salaryPerHour } = employee
  if(!firstName || !lastName || !title || !email || !phoneNumber || !hoursPerWeek || !salaryPerHour )
    throw new Error('Employee requires a first name, last name, title, email, phone number, hours-per-week, and salary-per-hour')
}

export default (state=[], {type, payload}) => {
  switch(type){
    case 'EMPLOYEES_SET':
      if(!Array.isArray(payload))
        throw new Error('employees mush be an array')
      payload.forEach(validateEmployee)
      return payload
    case 'EMPLOYEE_CREATE':
      validateEmployee(payload)
      return [payload, ...state]
    case 'EMPLOYEE_REMOVE':
      validateEmployee(payload)
      return state.filter(employee => employee._id !== payload.id)
    default:
      return state
  }
}