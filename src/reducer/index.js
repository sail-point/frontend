import {combineReducers} from 'redux'
import token from './token.js'
import businessEmployees from './business-employees.js'
import products from './products.js'
export default combineReducers({ token, businessEmployees, products })
