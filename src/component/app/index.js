import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter,Route} from 'react-router-dom'
import Keypad from '../keypad'
import Dashboard from '../dashboard'
import Landing from '../landing'
import Product from '../product'
import Order from '../order'
import Employee from '../employee'
import ProductView from '../product-view'
import Header from '../header'
import AdminNav from '../admin-nav'
import * as util from '../../lib/util.js'

class App extends React.Component {
  componentWillMount(){
    console.log('THE PROPS', this.props)
  }

  render(){
    let {loggedIn} = this.props
    let {employee} = this.props
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Route path='*' component={Header} />
            <main>
              <Route exact path='/' component={Landing} />
              <Route exact path='/signup' component={Landing} />
              <Route exact path='/login' component={Landing} />
              <Route exact path='/admin/product' component={Product} />
              <Route exact path='/admin/employee' component={Employee} />
              <Route path='/employee/login' component={Keypad} />
              <Route exact path='/employee/dashboard' render={(props) => (<Dashboard {...props} employee={employee} />)} />
              <Route exact path='/employee/products' render={(props) => (<ProductView {...props} employee={employee} />)} />
              <Route exact path='/employee/orders' render={(props) => (<Order {...props} employee={employee} />)} />
            </main>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  loggedIn: !!state.token,
  employee: state.employee,
})

let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
