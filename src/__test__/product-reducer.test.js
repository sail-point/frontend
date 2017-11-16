import reducer from '../reducer/product.js'

describe('Product reducer', () => {

  test('The initial state should be data:[] and count: 0', () => {
    let state = reducer(undefined, {type: ''})
    expect(state.data).toEqual([])
    expect(state.count).toBe(0)
  })

  describe('PRODUCT_SET', () => {
    test('Should set the Product array and Count', () => {
      let action  = {
        type: 'PRODUCT_SET',
        payload: {
          count: 2,
          data: ['test1', 'test2'],
        },
      }
      let state = reducer(undefined, action)
      expect(state).toEqual(action.payload)
    })

    test('should fail with no payload', () => {
      let shouldFail = () => {
        reducer(undefined, {type: 'PRODUCT_SET'})
      }
      expect(shouldFail).toThrow('products required')
    })

    test('should fail with invalid payload', () => {
      let shouldFail = () => {
        reducer(undefined, {
          type: 'PRODUCT_SET',
          payload: {},
        })
      }
      expect(shouldFail).toThrow('__VALIDATION_ERROR__ invalid products')
    })
  })

  describe('PRODUCT_CREATE', () => {
    test('Should add a product to product array and increment count', () => {
      let action = {
        type: 'PRODUCT_CREATE',
        payload: {name: 'hello', price: 15},
      }

      let state = reducer(undefined, action)
      expect(state.data[0].name).toBe('hello')
      expect(state.data[0].price).toBe(15)
      expect(state.count).toBe(1)
    })

    test('Should fail with no payload', () => {
      let shouldFail = () => {
        reducer(undefined, {type: 'PRODUCT_CREATE'})
      }
      expect(shouldFail).toThrow('product required')
    })

    test('should fail with invalid payload', () => {
      let shouldFail = () => {
        reducer(undefined, {
          type: 'PRODUCT_CREATE',
          payload: {},
        })
      }
      expect(shouldFail).toThrow('__VALIDATION_ERROR__ invalid product')
    })
  })

  describe('PRODUCT_UPDATE', () => {
    test('Should update an existing product in product array', () => {
      let initialState = {
        count: 2,
        data: [{_id: 1, name: 'hello', price: 10}, {_id: 2, name: 'world', price: 10}],
      }
      let action = {
        type: 'PRODUCT_UPDATE',
        payload: {name: 'hello', price: 1000, _id: 1},
      }

      let state = reducer(initialState, action)
      expect(state.data[0].name).toBe('hello')
      expect(state.data[0].price).toBe(1000)
      expect(state.count).toBe(2)
    })

    test('Should fail with no payload', () => {
      let shouldFail = () => {
        reducer(undefined, {type: 'PRODUCT_UPDATE'})
      }
      expect(shouldFail).toThrow('product required')
    })

    test('should fail with invalid payload', () => {
      let shouldFail = () => {
        reducer(undefined, {
          type: 'PRODUCT_UPDATE',
          payload: {},
        })
      }
      expect(shouldFail).toThrow('__VALIDATION_ERROR__ invalid product')
    })
  })

  describe('PRODUCT_REMOVE', () => {
    test('Should remove an existing product in product array and decrement count', () => {
      let initialState = {
        count: 2,
        data: [{_id: 1, name: 'hello', price: 10}, {_id: 2, name: 'world', price: 10}],
      }
      let action = {
        type: 'PRODUCT_REMOVE',
        payload: {name: 'hello', price: 10, _id: 1},
      }

      let state = reducer(initialState, action)
      expect(state.data.length).toBe(1)
      expect(state.count).toBe(1)
    })

    test('Should fail with no payload', () => {
      let shouldFail = () => {
        reducer(undefined, {type: 'PRODUCT_REMOVE'})
      }
      expect(shouldFail).toThrow('product required')
    })

    test('should fail with invalid payload', () => {
      let shouldFail = () => {
        reducer(undefined, {
          type: 'PRODUCT_REMOVE',
          payload: {},
        })
      }
      expect(shouldFail).toThrow('__VALIDATION_ERROR__ invalid product')
    })
  })

  test('should return emptyState on TOKEN_REMOVE', () => {
    let initialState = {
      count: 2,
      data: [{_id: 1, name: 'hello', price: 10}, {_id: 2, name: 'world', price: 10}],
    }
    let state = reducer(initialState, {type: 'TOKEN_REMOVE'})
    expect(state.data).toEqual([])
    expect(state.count).toBe(0)
  })

  test('should return the state', () => {
    let state = reducer('hello world', {type: ''})
    expect(state).toEqual('hello world')
  })
})
