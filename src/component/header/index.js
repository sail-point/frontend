import './header.scss'
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AdminNav from '../admin-nav'
import * as auth from '../../action/auth.js'

class Header extends React.Component {

  render() {
    let {loggedIn} = this.props
    let {employee} = this.props
    return (
      <nav className='navbar'>
        {util.renderIf(loggedIn,
          <AdminNav />
        )}
        {util.renderIf(employee,
        <ul>
          <li><Link to='/employee/products'>Products</Link></li>
          <li><Link to='/employee/employees'>Employees</Link></li>
          <li><Link to='/employee/orders'>Orders</Link></li>
        </ul>
      )}
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: !!state.token,
  employee: state.employee,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(auth.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
