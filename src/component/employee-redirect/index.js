import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as util from '../../lib/util.js'
import Header from '../header'

class EmployeeRedirect extends React.Component {
  render(){
    let {location, history, employee} = this.props
    let {pathname} = location
    let redirectTo = null

    if(!employee && pathname !== '/employee/login'){
      redirectTo= '/employee/login'
    }

    return (
      <div className='employee-redirect'>
        { redirectTo ? <Redirect to={redirectTo} /> : <Header /> }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  employee: state.employee,
})

export default connect(mapStateToProps)(EmployeeRedirect)
