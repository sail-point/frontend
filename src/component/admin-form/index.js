import React from 'react'
import * as util from '../../lib/util.js'
import validator from 'validator'

let clearState = {
  storeName: '',
  storeNameDirty: false,
  storeNameError: 'Company Name is required',
  email: '',
  emailDirty: false,
  emailError: 'Email is required',
  address: '',
  addressDirty: false,
  phone: '',
  phoneDirty: false,
  website: '',
  websiteDIrty: false,
  password: '',
  passwordDirty: false,
  passwordError: 'Password is required',
  submitted: false,
}

class AdminForm extends React.Component {
  constructor(props){
    super(props)
    this.state = clearState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateChange = this.validateChange.bind(this)
  }

  validateChange(name, value){
    if(this.props.type === 'login')
      return null
    switch (name) {
      case 'storeName':
        if(!validator.isAlpha(value))
          return 'You must provide a company name'
        return null
      case 'email':
        if(!validator.isEmail(value))
          return 'you must provide a valid email'
        return null
      case 'password':
        if(value.length < 8)
          return 'Password must be at least 8 characters long'
        if(!validator.isAlphanumeric(value))
          return 'Your password may only contain numbers and letters'
        return null
      default:
        return null
    }
  }

  handleChange(event){
    let { name, value } = event.target;
    this.setState({
      [name]: value,
      [`${ name }Dirty`]: true,
      [`${ name }Error`]: this.validateChange(name, value),
    });
  };

  handleSubmit(event){
    event.preventDefault();
    let { storeNameError, emailError, passwordError } = this.state
    if(this.props.type === 'login' || !storeNameError && !emailError && !passwordError){
      this.props.onComplete(this.state)
      this.setState(emptyState)
    } else {
      this.setState({
        storeNameDirty: true,
        emailDirty: true,
        addressDirty: true,
        phoneDirty: true,
        webiste: true,
        passwordDirty: true,
        submitted: true,
      })
    }
  }


  render(){
    let { type } = this.props

    type = type === 'login' ? type : 'signup';

    return (
      <form
        className='admin-form'
        noValidate
        onSubmit={ this.handleSubmit } >

        <input
          name='storeName'
          placeholder='Company Name'
          type='text'
          value={ this.state.storeName }
          onChange={ this.handleChange }
          />

        <input
          name='email'
          placeholder='email'
          type='email'
          value={ this.state.email }
          onChange={ this.handleChange }
          />
        <input
          name='address'
          placeholder='address'
          type='text'// TODO: address input type??
          value={ this.state.address }
          onChange={ this.handleChange }
        />

        <input
          name='phone'
          placeholder='phone'
          type='text'// TODO: numerical or string?
          value={ this.state.phone }
          onChange={ this.handleChange }
          />

        <input
          name='webiste'
          placeholder='website'
          type='URL'// TODO: check input type
          value={ this.state.city }
          onChange={ this.handleChange }
          />

        <input
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
          />

        <button type='submit'> { type } </button>

      </form>
    )
  }
}

export default AdminForm;
