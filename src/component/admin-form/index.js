import React from 'react'
import * as util from '../../lib/util.js'
import validator from 'validator'

let emptyState = {
  storeName: '',
  storeNameDirty: false,
  storeNameError: 'Company Name is required',
  email: '',
  emailDirty: false,
  emailError: 'Email is required',
  address: '',
  addressDirty: false,
  addressError: '',
  phone: '',
  phoneDirty: false,
  phoneError: '',
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
    this.state = emptyState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateChange = this.validateChange.bind(this)
  }

  validateChange(name, value){
    if(this.props.type === 'login')
      return null
    switch (name) {
      case 'email':
        if(!validator.isEmail(value))
          return 'you must provide a valid email'
        return null
      case 'password':
        if(value.length < 8)
          return 'Password must be 8 characters long'
        if(!validator.isAlphanumeric(value))
          return 'Password may only contain numbers and letters'
        return null
      case 'website':
        if(!validator.isURL(value))
          return 'Please provide a valid webiste URL'
        return null
      case 'phone':
        if(validator.isAlpha(value))
          return 'Invalid input'
        if(value.length < 10)
          return 'Please provide a valid phone number'
        return null
      default:
        return null
    }
  }

  handleChange(event){
    let { name, value } = event.target
    this.setState({
      [name]: value,
      [`${ name }Dirty`]: true,
      [`${ name }Error`]: this.validateChange(name, value),
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let { storeNameError, emailError, passwordError } = this.state
    if(this.props.type === 'signup' && !storeNameError && !emailError && !passwordError){
      this.props.onComplete(this.state)
      this.setState(emptyState)
    } else if (this.props.type === 'login'){
      this.props.onComplete(this.state)
      this.setState(emptyState)
    } else {
      this.setState({
        storeNameDirty: true,
        emailDirty: true,
        addressDirty: true,
        phoneDirty: true,
        website: true,
        passwordDirty: true,
        submitted: true,
      })
    }
  }


  render(){
    let { type } = this.props

    type = type === 'login' ? type : 'signup'

    return (
      <form
        className='admin-form'
        noValidate
        onSubmit={ this.handleSubmit } >

        {util.renderIf(type !== 'login',
          <div className='form-field'>
            <input
              id='storeName'
              name='storeName'
              placeholder='Company Name'
              type='text'
              value={ this.state.storeName }
              onChange={ this.handleChange }
            />
            <span className='warning'>*</span>
            {util.renderIf(this.state.storeNameDirty,
              <label className='warning-label' htmlFor='storeName'>{ this.state.storeNameError }</label>)}
          </div>
        )}

        <div className='form-field'>
          <input
            id='email'
            name='email'
            placeholder='Email'
            type='email'
            value={ this.state.email }
            onChange={ this.handleChange }
          />
          {util.renderIf(type === 'signup',
            <span className='warning'>*</span>)}
          {util.renderIf(this.state.emailDirty,
            <label className='warning-label' htmlFor='email'>{ this.state.emailError }</label>)}
        </div>

        {util.renderIf(type !== 'login',
          <div className='form-field'>
            <input
              name='address'
              placeholder='Address'
              type='text'
              value={ this.state.address }
              onChange={ this.handleChange }
            />
          </div>
        )}

        {util.renderIf(type !== 'login',
          <div className='form-field'>
            <input
              name='phone'
              placeholder='Phone ex:2065554208'
              type='tel'
              value={ this.state.phone }
              onChange={ this.handleChange }
            />
          </div>
        )}

        {util.renderIf(type !== 'login',
          <div className='form-field'>
            <input
              name='website'
              placeholder='Website'
              type='URL'
              value={ this.state.city }
              onChange={ this.handleChange }
            />
          </div>
        )}

        <div className='form-field'>
          <input
            id='password'
            name='password'
            placeholder='Password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          {util.renderIf(type === 'signup',
            <span className='warning'>*</span>)}
          {util.renderIf(this.state.passwordDirty,
            <label className='warning-label' htmlFor='password'>{ this.state.passwordError }</label>)}
        </div>
        <div className='form-field button'>
          <button type='submit'> { type } </button>
        </div>

      </form>
    )
  }
}

export default AdminForm
