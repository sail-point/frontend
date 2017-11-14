import React from 'react'
import {connect} from 'react-redux'
import AdminForm from '../admin-form'

class Landing extends React.Component {
  render(){
    return (
      <div className='landing'>
        <h1>Landing</h1>
        <AdminForm />
      </div>
    )
  }
}

const mapStateToProps =(state) => ({loggedIn: !!state.token})

export default connect(mapStateToProps)(Landing)
