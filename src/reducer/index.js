import {combineReducers} from 'redux'
import token from './token.js'
import employees from './employees.js'
import products from './product.js'
import employee from './keypad.js'
import orders from './order.js'
export default combineReducers({ token, employees, employee, products, orders })
