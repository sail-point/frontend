import {combineReducers} from 'redux'
import token from './token.js'
import employee from './keypad.js'
import products from './product.js'

export default combineReducers({token, employee, products})
