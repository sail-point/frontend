import {combineReducers} from 'redux'
import token from './token.js'
import employees from './employees.js'
import products from './products.js'
export default combineReducers({ token, employees, products })
