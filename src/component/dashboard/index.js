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
  // token: state.token,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblNlZWQiOiI2Yjk4MjNmZWQwZjg5YjBjMGE4YTE5Zjc2OTE0NTdkZGI1NDEwOTBkNGQ5Yjc0YzJmMmQyOGMxODE4NzEzZGE0NGE4YzU0YmE3ODY1MzM4ZmQ1NGQ5YTZkNmY1YzlhYmUxZWMxODdlMmYyYTRhZjM3NDg4MTU3MDQ2M2QxMzM0ZSIsImlhdCI6MTUxMDY4NTgxNiwiZXhwIjoxNTExMjkwNjE2fQ.0W0exlx2pVqZUTtrsD1BiFV61kY_XQRux46TmydJDpg',
})

export default connect(mapStateToProps)(Dashboard)
