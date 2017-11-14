import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter,Route} from 'react-router-dom'
import Landing from '../landing'
import ProductList from '../product-list'
import Keypad from '../keypad'

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
            <Route exact path='/admin/product' component={ProductList} />
            <Route exact path='/employee/login' component={Keypad} />
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
