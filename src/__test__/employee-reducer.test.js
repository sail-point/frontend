import reducer from '../reducer/business-employees.js'

describe('businessEmployee reducer', () => {
  test('the intial state shuld be []', () => {
    let state = reducer(undefined, {type: ''})
    expect(state).toEqual([])
  })

  test('should create the employee', () => {
    let action  = {
      type: 'EMPLOYEE_CREATE',
      payload: {
        firstName: 'yumi',
        lastName: 'fukuzawa',
        title: 'manager',
        email: 'yumi@lillian.net',
        phoneNumber: '206-453-2435',
        hoursPerWeek: 30,
        salaryPerHour: 20,
      },
    }
    let state = reducer(undefined, action)
    expect(state).toEqual([action.payload])
  })

  test('create should fail with no payload', () => {
    let shouldFail = () => {
      reducer(undefined, {type: 'EMPLOYEE_CREATE'})
    }
    expect(shouldFail).toThrow('Employee required')
  })

  test('create should fail with invalid payload', () => {
    let shouldFail = () => {
      reducer(undefined, {
        type: 'EMPLOYEE_CREATE',
        payload: {},
      })
    }
    expect(shouldFail).toThrow('Employee requires a first name, last name, title, email, phone number, hours-per-week, and salary-per-hour')
  })

  test('should return the state', () => {
    let state = reducer('hello world', {type: ''})
    expect(state).toEqual('hello world')
  })

  test('should set the employee', () => {
    let action  = {
      type: 'EMPLOYEES_SET',
      payload: [
        {
          firstName: 'yumi',
          lastName: 'fukuzawa',
          title: 'manager',
          email: 'rosachinensisenbouton@lillian.net',
          phoneNumber: '206-453-2435',
          hoursPerWeek: 30,
          salaryPerHour: 20,
        },
        {
          firstName: 'sachiko',
          lastName: 'ogasawara',
          title: 'hostess',
          email: 'rosachinensis@lillian.net',
          phoneNumber: '206-453-2436',
          hoursPerWeek: 30,
          salaryPerHour: 25,
        },
      ],
    }
    let state = reducer(undefined, action)
    expect(state).toEqual(action.payload)
  })

  test('set should fail with no payload', () => {
    let shouldFail = () => {
      reducer(undefined, {type: 'EMPLOYEES_SET'})
    }
    expect(shouldFail).toThrow('employees must be an array')
  })

  test('set should fail with invalid payload', () => {
    let shouldFail = () => {
      reducer(undefined, {
        type: 'EMPLOYEES_SET',
        payload: {},
      })
    }
    expect(shouldFail).toThrow('employees must be an array')
  })

  test.only('should update the employee', () => {
    let action  = {
      type: 'EMPLOYEE_CREATE',
      payload: {
        firstName: 'yumi',
        lastName: 'fukuzawa',
        title: 'manager',
        email: 'yumi@lillian.net',
        phoneNumber: '206-453-2435',
        hoursPerWeek: 30,
        salaryPerHour: 20,
      },
    }
    let state = reducer(undefined, action)
    expect(state).toEqual(action.payload)
  })
})
