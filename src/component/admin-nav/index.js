import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import * as auth from '../../action/auth.js'

class adminNav extends React.Component {

  render() {
    let {employee} = this.props
    return (
      <nav className='navbar'>
        <ul>
          <li><button onClick={this.props.logout}>logout</button></li>
          <li><Link className='button' to='/employee/login'>Employee Login</Link></li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  employee: state.employee,
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(auth.logout())
    this.props.history.push('/')
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(adminNav)
