import React from 'react'
import * as util from '../../lib/util.js'
import validator from 'validator'

let emptyState = {
  firstName: '',
  firstNameDirty: false,
  firstNameError: 'First Name is required',
  lastName: '',
  lastNameDirty: false,
  lastNameError: 'Last Name is required',
  title: '',
  titleDirty: false,
  titleError: 'Title is required',
  email: '',
  emailDirty: false,
  emailError: 'Email is required',
  phoneNumber: '',
  phoneNumberDirty: false,
  phoneNumberError: 'Phone number is required',
  hoursPerWeek: '',
  hoursPerWeekDirty: false,
  hoursPerWeekError: 'Expected hours per week is required',
  salaryPerHour: '',
  salaryPerHourDirty: false,
  salaryPerHourError: 'Salary is required',
  pin: '',
  pinDirty: false,
  pinError: 'Pin is required',
  hired: '',
  terminated: '',
  submitted: false,
}

class EmployeeForm extends React.Component {
  constructor(props){
    super(props)
    this.state = this.props.employee || emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleValidate = this.handleValidate.bind(this)
  }

  handleValidate(name, value){
    switch (name) {
      case 'firstName':
        if(!validator.isAlpha(value))
          return 'You must provide an employee first name'
        return null
      case 'lastName':
        if(!validator.isAlpha(value))
          return 'You must provide an employee last name'
        return null
      case 'email':
        if(!validator.isEmail(value))
          return 'you must provide a valid email'
        return null
      case 'phoneNumber':
        if(validator.isAlpha(value) || value.length !== 10)
          return 'you must provide a valid phone number'
        return null
      case 'pin':
        if(value.length !== 4)
          return 'Pin must be 4 characters long'
        return null
      default:
        return null
    }
  }

  handleChange(e){
    let {name, value, type} = e.target
    value = type === 'number' ? Number(value) : value
    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidate(name, value),
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(emptyState)
  }


  render(){
    let {
      type,
    } = this.props
    return (
      <form
        className='employee-form'
        onSubmit={ this.handleSubmit } >

        <div className='form-field'>
          <p>{this.state.firstNameError}</p>
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            value={ this.state.firstName }
            onChange={ this.handleChange }
          />
        </div>
        <div className='form-field'>
          <p>{this.state.lastNameError}</p>
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            value={ this.state.lastName }
            onChange={ this.handleChange }
          />
        </div>
        <div className='form-field'>
          <p>{this.state.titleError}</p>
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={ this.state.title }
            onChange={ this.handleChange }
          />
        </div>
        <div className='form-field'>
          <p>{this.state.emailError}</p>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={ this.state.email }
            onChange={ this.handleChange }
          />
        </div>
        <div className='form-field'>
          <p>{this.state.phoneNumberError}</p>
          <input
            name='phoneNumber'
            placeholder='Phone Number'
            type='text'
            value={ this.state.phoneNumber }
            onChange={ this.handleChange }
          />
        </div>
        <div className='form-field'>
          <p>{this.state.hoursPerWeekError}</p>
          <input
            name='hoursPerWeek'
            placeholder='Hours per Week'
            type='number'
            value={ this.state.hoursPerWeek }
            onChange={ this.handleChange }
          />
        </div>
        <div className='form-field'>
          <p>{this.state.salaryPerHourError}</p>
          <input
            name='salaryPerHour'
            placeholder='Salary per Hour'
            type='number'
            value={ this.state.salaryPerHour }
            onChange={ this.handleChange }
          />
        </div>
        <div className='form-field'>
          <p>{this.state.pinError}</p>
          <input
            name='pin'
            placeholder='Pin'
            type='text'
            value={this.state.pin}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-field date'>
          <label htmlFor='hired'>Date Hired</label>
          <input
            id='hired'
            name='hired'
            placeholder='Hired'
            type='date'
            value={this.state.hired}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-field date'>
          <label htmlFor='terminated'>Date Terminated</label>
          <input
            id='terminated'
            name='terminated'
            placeholder='Terminated'
            type='date'
            value={this.state.terminated}
            onChange={this.handleChange}
          />
        </div>
        <div className='form-field button'>
          <button type='submit'> Submit </button>
        </div>
      </form>
    )
  }
}

export default EmployeeForm
