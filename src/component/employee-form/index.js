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
        if(!validator.isMobilePhone(value))
          return 'you must provide a valid phone number'
        return null
      case 'hoursPerWeek':
        if(!validator.isInt(value))
          return 'You must provide hours per week'
        return null
      case 'salaryPerHour':
        if(!validator.isInt(value))
          return 'You must provide salary per hour'
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
      [`${name}Error`]: value ? null : emptyState[`${name}Error`],
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
    let buttonText = this.props.employee ? 'update employee' : 'create employee'
    return (
      <form
        className='employee-form'
        onSubmit={ this.handleSubmit } >

        <label> First Name </label>
        <input
          type='text'
          name='firstName'
          placeholder='first name'
          value={ this.state.firstName }
          onChange={ this.handleChange }
          />

        <label> Last Name </label>
        <input
          type='text'
          name='lastName'
          placeholder='last name'
          value={ this.state.lastName }
          onChange={ this.handleChange }
          />

        <label> Title </label>
        <input
          type='text'
          name='title'
          placeholder='title'
          value={ this.state.title }
          onChange={ this.handleChange }
          />

        <label> Email </label>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={ this.state.email }
          onChange={ this.handleChange }
          />

        <label> Phone Number </label>
        <input
          name='phoneNumber'
          placeholder='phone number'
          type='text'
          value={ this.state.phoneNumber }
          onChange={ this.handleChange }
          />

        <label> Hours Per Week </label>
        <input
          name='hoursPerWeek'
          placeholder='hours'
          type='number'
          value={ this.state.hoursPerWeek }
          onChange={ this.handleChange }
          />

        <label> Salary Per Hour </label>
        <input
          name='salaryPerHour'
          placeholder='salary'
          type='number'
          value={ this.state.salaryPerHour }
          onChange={ this.handleChange }
          />

        <label> Pin </label>
        <input
          name='pin'
          placeholder='pin'
          type='text'
          value={this.state.pin}
          onChange={this.handleChange}
          />

        <label> Hired </label>
        <input
          name='hired'
          placeholder='hired'
          type='date'
          value={this.state.hired}
          onChange={this.handleChange}
          />

        <label> Terminated </label>
        <input
          name='terminated'
          placeholder='terminated'
          type='date'
          value={this.state.terminated}
          onChange={this.handleChange}
          />

        <button type='submit'> Submit </button>
      </form>
    )
  }
}

export default EmployeeForm
