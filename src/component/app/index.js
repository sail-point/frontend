import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter,Route} from 'react-router-dom'
import Keypad from '../keypad'
import Dashboard from '../dashboard'
import Landing from '../landing'
import Product from '../product'

class App extends React.Component {
  componentWillMount(){
    let {loggedIn} = this.props
  }

  render(){
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Landing} />
            <Route exact path='/signup' component={Landing} />
            <Route exact path='/login' component={Landing} />
            <Route exact path='/admin/product' component={Product} />
            <Route exact path='/employee/login' component={Keypad} />
            <Route exact path='/employee/dashboard' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  loggedIn: !!state.token,
})

let mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
