import React from 'react'
import {connect} from 'react-redux'

class Landing extends React.Component {
  render(){
    return (
      <div className='landing'>
        <h1>Landing</h1>
      </div>
    )
  }
}

const mapStateToProps =(state) => ({loggedIn: !!state.token})

export default connect(mapStateToProps)(Landing)
