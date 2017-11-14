import React from 'react'
import {connect} from 'react-redux'
import * as util from '../../lib/util.js'

class Dashboard extends React.Component {

  render(){
    return (
      <div className='dashboard'>
        <h1> Employee Dashboard </h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  employee: state.employee,
  token: state.token,
})

export default connect(mapStateToProps)(Dashboard)
