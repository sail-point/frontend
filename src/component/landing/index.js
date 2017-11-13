import React from 'react'
import {connect} from 'react-redux'

class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(employee)
    this.props.login(employee)
    .then(() => {
      this.props.history.push('/employee')
    })
    .catch(console.error)
  }

  // hanleSign()

  render(){
    return (
      <div className='landing'>
        <h1>Landing</h1>
      </div>
    )
  }
}

// const mapStateToProps =(state) => ({loggedIn: !!state.token})

const mapStateToProps (dispatch) => ({

  login: (employee) => dispatch(auth.login(employee)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
