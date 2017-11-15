import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AdminForm from '../admin-form'
import * as util from '../../lib/util.js'
import * as auth from '../../action/store.js'

class Landing extends React.Component {
  render(){
    let {location} = this.props
    return (
      <div className='landing'>
        <h1>Welcome</h1>

        {util.renderIf(location.pathname === '/signup',
          <div>
            <AdminForm onComplete={this.props.signup} />
            <p> already have an account? </p>
            <Link to='/login'> Login </Link>
          </div>
        )}

        {util.renderIf(location.pathname === '/login',
          <div>
            <AdminForm type='login' onComplete={this.props.login} />
            <p> dont have an account ? </p>
            <Link to='/signup'> Signup </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({loggedIn: !!state.token})
const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(auth.signup(user)),
  login: (user) => dispatch(auth.login(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
