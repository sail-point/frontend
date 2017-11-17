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
        <div className='inner'>
          <h1><Link to='/'>Sail Point</Link></h1>
          {util.renderIf(!employee && !loggedIn,
            <nav className='navbar'>
              <ul className='signingInSection'>
                <li><Link className='button' to='/login'>Log In</Link></li>
                <li><Link className='button' to='/signup'>Sign Up</Link></li>
              </ul>
            </nav>
          )}

          {util.renderIf(loggedIn && !employee,
            <nav className='navbar'>
              <ul>
                <li><Link className='button' to='/admin/employee'>Employee</Link></li>
                <li><Link className='button' to='/admin/product'>Product</Link></li>
                <li><Link className='button' to='/employee/login'>Employee Login</Link></li>
              </ul>

              <button className='logout-btn' onClick={this.props.logout}>logout</button>
            </nav>
          )}
          {util.renderIf(loggedIn && employee,
            <nav className='navbar'>
              <ul>
                <li><Link className='button' to='/employee/products'>Products</Link></li>
                <li><Link className='button' to='/employee/orders'>Orders</Link></li>
                <li><Link className='button' to='/admin/product'>Back To admin</Link></li>
              </ul>

              <ul className='signingInSection'>
                <button className='logout-btn' onClick={this.props.logout}>logout</button>
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
