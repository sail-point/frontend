import './header.scss'
import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends React.Component {

  render() {
    let {employee} = this.props
    return (
      <nav className='navbar'>
        <ul>
          <li><Link to='/employee/products'>Products</Link></li>
          <li><Link to='/employee/employees'>Employees</Link></li>
          <li><Link to='/employee/orders'>Orders</Link></li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  employee: state.employee,
})

export default connect(mapStateToProps)(Header)
