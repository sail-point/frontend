import React from 'react'
import * as util from '../../lib/util.js'

let emptyState = {
  firstName: '',
  firstNameDirty: false,
  firstNameError: 'First name is required.',
  lastName: '',
  lastNameDirty: false,
  lastNameError: 'Last name is required.',
}

class ProductForm extends React.Component {
  constructor(props){
    super(props)
    this.state = props.products ? {...emptyState, ...props.product} : emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleValidate = this.handleValidate.bind(this)
  }

  componentWillReceiveProps(props){
    if(props.product)
      this.setState(props.product)
  }

  componentDidMount(){
    console.log('mounted')
  }

  handleChange(e){
    let {name, value} = e.target
    this.setState({
      [name]: value,
      [name+'Dirty']: true,
      [name+'Error']: this.handleValidate(e.target),
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(emptyState)
  }

  handleValidate({type, placeholder, value}){
    switch(type){
      case 'text':
        if(value.length === 0)
          return placeholder + ' is required.'
        return null
      default:
        return null
    }
  }

  render(){
    return (
      <form
        className='product-form'
        onSubmit={this.handleSubmit}>

        {util.renderIf(this.state.firstNameDirty,
          <p>{this.state.firstNameError}</p>
        )}
        <label htmlFor='firstName'>First Name</label>
        <input
          id='firstName'
          name='firstName'
          value={this.state.firstName}
          onChange={this.handleChange}
          placeholder='First Name'
        />

        {util.renderIf(this.state.lastNameDirty,
          <p>{this.state.lastNameError}</p>
        )}
        <label htmlFor='lastName'>Last Name</label>
        <input
          id='lastName'
          name='lastName'
          value={this.state.lastName}
          onChange={this.handleChange}
          placeholder='Last Name'
        />

        <p>
          <button type='submit'>{this.props.profile ? 'update' : 'create'} profile</button>
        </p>
      </form>
    )
  }
}

export default ProductForm
