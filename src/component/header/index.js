import './header.scss'
import React from 'react'
import { log } from 'util'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as util from '../../lib/util.js'
import * as auth from '../../action/auth.js'
import { renderIf } from '../../lib/util.js'

class Header extends React.Component {

  render() {
    let { employee, loggedIn } = this.props

    return (
      <header>
        <div>
          <h1><Link to='/'>Sail Point</Link></h1>
          {util.renderIf(!employee && !loggedIn,
            <nav className='navbar'>
              <ul className='signingInSection'>
                <li><Link to='/login'>Log In</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
              </ul>
            </nav>
          )}

          {util.renderIf(loggedIn && !employee,
            <nav className='navbar'>
              <ul>
                <li><Link to='/admin/employee'>Employee</Link></li>
                <li><Link to='/admin/product'>Product</Link></li>
                <li><Link to='/employee/login'>Employee Login</Link></li>
              </ul>

              <ul className='signingInSection'>
                <li></li>
              </ul>
              <button className='logout-btn' onClick={this.props.logout}>logout</button>
            </nav>
          )}
          {util.renderIf(loggedIn && employee,
            <nav className='navbar'>
              <ul>
                <li><Link to='/employee/products'>Products</Link></li>
                <li><Link to='/employee/employees'>Employees</Link></li>
                <li><Link to='/employee/orders'>Orders</Link></li>
                <li><Link to='/admin/product'>Back To admin</Link></li>
              </ul>

              <ul className='signingInSection'>
                <li>Clock</li>
              </ul>
            </nav>
          )}
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  employee: state.employee,
  loggedIn: !!state.token,
})

const mapDispatchToProps = (dispatch, props) => ({
  logout: () => {
    dispatch(auth.logout())
    props.history.push('/')
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)