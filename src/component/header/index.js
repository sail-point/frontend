import './header.scss'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as util from '../../lib/util.js'
import * as auth from '../../action/auth.js'
import { renderIf } from '../../lib/util.js';
import { log } from 'util';

class Header extends React.Component {

  render() {
    let { employee, loggedIn } = this.props
    console.log('-->', this.props)

    return (
      <header>

        <h1>Sail Point</h1>
        {util.renderIf(!employee && !loggedIn,
          <nav className='navbar'>
            <ul>
              <li>Not logged in</li>
              <li><Link to='/login'>Log In</Link></li>
              <li><Link to='/signup'>Sign Up</Link></li>
            </ul>
          </nav>
        )}

        {util.renderIf(loggedIn && !employee,
          <nav className='navbar'>
            <ul>
              <li>loggedIn not employee</li>
              <li><Link to='/admin/employee'>Employee</Link></li>
              <li><Link to='/admin/product'>Product</Link></li>
            </ul>

            <ul>
              <li><button onClick={this.props.logout}>logout</button></li>
              <li><Link to='/employee/login'>Employee Login</Link></li>
            </ul>
          </nav>
        )}
        {util.renderIf(loggedIn && employee,
          <nav className='navbar'>
            <ul>
              <li>loggedIn Employee</li>
              <li><Link to='/employee/products'>Products</Link></li>
              <li><Link to='/employee/employees'>Employees</Link></li>
              <li><Link to='/employee/orders'>Orders</Link></li>
            </ul>

            <ul>
              <li><button onClick={this.props.logout}>logout</button></li>
              <li><Link to='/employee/login'>Employee Login</Link></li>
            </ul>
          </nav>
        )}
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