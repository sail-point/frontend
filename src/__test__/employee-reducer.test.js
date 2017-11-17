import reducer from '../reducer/employees.js'

describe('businessEmployee reducer', () => {
  test('the initial state should be []', () => {
    let state = reducer(undefined, {type: ''})
    expect(state).toEqual([])
  })

  test('should return the state', () => {
    let state = reducer('hello world', {type: ''})
    expect(state).toEqual('hello world')
  })

  describe('EMPLOYEE_CREATE', () => {
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
          pin: '3436',
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
      expect(shouldFail).toThrow('Employee requires a first name, last name, title, email, phone number, hours-per-week, salary-per-hour, and pin')
    })
  })

  describe('EMPLOYEES_SET', () => {
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
            pin: '3534',
          },
          {
            firstName: 'sachiko',
            lastName: 'ogasawara',
            title: 'hostess',
            email: 'rosachinensis@lillian.net',
            phoneNumber: '206-453-2436',
            hoursPerWeek: 30,
            salaryPerHour: 25,
            pin: '3343',
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
  })

  describe('EMPLOYEE_UPDATE', () => {
    test('Should update an existing product in product array', () => {
      let employees = [
        {
          firstName: 'sei',
          lastName: 'satou',
          title: 'manager',
          email: 'rosagigantea@lillian.net',
          phoneNumber: '206-453-2437',
          hoursPerWeek: 30,
          salaryPerHour: 20,
          pin: '2222',
          _id: 1,
        },
        {
          firstName: 'shimako',
          lastName: 'toudou',
          title: 'hostess',
          email: 'rosagiganteaenbouton@lillian.net',
          phoneNumber: '206-453-2438',
          hoursPerWeek: 15,
          salaryPerHour: 15,
          pin: '3333',
          _id: 2,
        },
      ]
      let action = {
        type: 'EMPLOYEE_UPDATE',
        payload: {
          firstName: 'shimako',
          lastName: 'toudou',
          title: 'hostess',
          email: 'rosagiganteaenbouton@lillian.net',
          phoneNumber: '206-453-2438',
          hoursPerWeek: 15,
          salaryPerHour: 20,
          pin: '3333',
          _id: 2},
      }
      let state = reducer(employees, action)
      expect(state[1].firstName).toBe('shimako')
      expect(state[1].salaryPerHour).toBe(20)
    })

    test('update should fail with no payload', () => {
      let employees = [
        {
          firstName: 'sei',
          lastName: 'satou',
          title: 'manager',
          email: 'rosagigantea@lillian.net',
          phoneNumber: '206-453-2437',
          hoursPerWeek: 30,
          salaryPerHour: 20,
          pin: '2222',
          _id: 1,
        },
        {
          firstName: 'shimako',
          lastName: 'toudou',
          title: 'hostess',
          email: 'rosagiganteaenbouton@lillian.net',
          phoneNumber: '206-453-2438',
          hoursPerWeek: 15,
          salaryPerHour: 15,
          pin: '3333',
          _id: 2,
        },
      ]
      let action = {}
      let state = reducer(employees, action)
      expect(state[1].firstName).toBe('shimako')
      expect(state[1].salaryPerHour).toBe(15)
    })

    test('set should fail with invalid payload', () => {
      let shouldFail = () => {
        reducer(undefined, {
          type: 'EMPLOYEES_UPDATE',
          payload: {},
        })
      }
      expect(shouldFail()).toEqual(undefined)
    })
  })

  describe('EMPLOYEE_DESTROY', () => {
    test('Should destroy an existing product in product array', () => {
      let employees = [
        {
          firstName: 'sei',
          lastName: 'satou',
          title: 'manager',
          email: 'rosagigantea@lillian.net',
          phoneNumber: '206-453-2437',
          hoursPerWeek: 30,
          salaryPerHour: 20,
          pin: '2222',
          _id: 1,
        },
        {
          firstName: 'shimako',
          lastName: 'toudou',
          title: 'hostess',
          email: 'rosagiganteaenbouton@lillian.net',
          phoneNumber: '206-453-2438',
          hoursPerWeek: 15,
          salaryPerHour: 15,
          pin: '3333',
          _id: 2,
        },
      ]
      let action = {
        type: 'EMPLOYEE_DESTROY',
        payload: {
          firstName: 'shimako',
          lastName: 'toudou',
          title: 'hostess',
          email: 'rosagiganteaenbouton@lillian.net',
          phoneNumber: '206-453-2438',
          hoursPerWeek: 15,
          salaryPerHour: 20,
          pin: '3333',
          _id: 2},
      }
      let state = reducer(employees, action)
      // console.log('employees.count: ', employees.count)
      expect(state.count).toBe(1)
      // expect(state[1].salaryPerHour).toBe(20)
    })

    test('destroy should fail with no payload', () => {
      let shouldFail = () => {
        reducer(undefined, {type: 'EMPLOYEE_DESTROY'})
      }
      expect(shouldFail).toThrow('Employee required')
    })

    test('destroy should fail with invalid payload', () => {
      let shouldFail = () => {
        reducer(undefined, {
          type: 'EMPLOYEE_DESTROY',
          payload: {},
        })
      }
      expect(shouldFail).toThrow('Employee requires a first name, last name, title, email, phone number, hours-per-week, salary-per-hour, and pin')
    })
  })
})
