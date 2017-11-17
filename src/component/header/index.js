import './header.scss'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as util from '../../lib/util.js'
import * as auth from '../../action/auth.js'

class Header extends React.Component {

  render() {
    let { employee } = this.props


    return (
      <header>

        <nav className='navbar'>
          <ul>
            <li><Link to='/login'>Log In</Link></li>
            <li><Link to='/signup'>Sign Up</Link></li>
          </ul>
        </nav>

        <nav className='navbar'>
          <ul>
            <li><Link to='/admin/employee'>Employee</Link></li>
            <li><Link to='/admin/product'>Product</Link></li>
          </ul>
        </nav>

        <nav className='navbar'>
          <ul>
            <li><Link to='/employee/products'>Products</Link></li>
            <li><Link to='/employee/employees'>Employees</Link></li>
            <li><Link to='/employee/orders'>Orders</Link></li>
          </ul>

          <ul>
            <li><button onClick={this.props.logout}>logout</button></li>
            <li><Link to='/employee/login'>Employee Login</Link></li>
          </ul>
        </nav>


      </header>
    )
  }
}

const mapStateToProps = state => ({
  employee: state.employee,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(auth.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)