import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AdminForm from '../admin-form'
import * as util from '../../lib/util.js'
import * as auth from '../../action/auth.js'

class Landing extends React.Component {
  componentWillMount(){
    if(!this.props.loggedIn) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/admin/product')
    }
  }
  render(){
    let {location} = this.props
    return (
      <div className='landing'>
        <h1>Welcome</h1>

        {util.renderIf(location.pathname === '/signup',
          <div>
            <AdminForm onComplete={this.props.signup} history={this.props.history} />
          </div>
        )}

        {util.renderIf(location.pathname === '/login',
          <div>
            <AdminForm type='login' onComplete={this.props.login} history={this.props.history} />
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
