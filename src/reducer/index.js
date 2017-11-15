import {combineReducers} from 'redux'
import token from './token.js'
import employees from './employees.js'
import products from './product.js'
export default combineReducers({ token, employees, products })
