import './employee-item.scss'
import React from 'react'
import EmployeeForm from '../employee-form'
import {connect} from 'react-redux'
import * as employee from '../../action/employee.js'
import * as util from '../../lib/util.js'

class EmployeeItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {editing: false}
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
  }

  handleUpdate(employee){
    this.props.employeeUpdate(employee)
    this.setState({editing: false})
  }

  handleDestroy(employee){
    this.props.employeeDestroy(employee)
    this.props.employeeUpdate(employee)
  }

  render(){
    let {
      employee,
      employeeDestroy,
      employeeUpdate,
    } = this.props

    let {editing} = this.state

    return (
      <div className='employee-item'>
        {util.renderIf(!editing,
          <div>
            <p><strong>Name:</strong> {employee.firstName} {employee.lastName}</p>
            <p><strong>Title:</strong> {employee.title} </p>
            <p><strong>Email:</strong> {employee.email} </p>
            <p><strong>Phone:</strong> {employee.phoneNumber} </p>
            <p><strong>Hours per week:</strong> {employee.hoursPerWeek} </p>
            <p><strong>Salary per hour:</strong> {employee.salaryPerHour} </p>
            <p><strong>Pin:</strong> {employee.pin} </p>
            <p><strong>Hired:</strong> {employee.hired} </p>
            <p><strong>Terminated:</strong> {employee.terminated} </p>
            <button className='edit' onClick={() => this.setState({editing: true})}> Edit </button>
            <button className='delete' onClick={() => employeeDestroy(employee)}> Delete </button>
          </div>
        )}

        {util.renderIf(editing,
          <EmployeeForm employee={employee} onComplete={this.handleUpdate} />)}
        {util.renderIf(editing,
          <button onClick={() => this.setState({editing: false})}>
            Cancel
          </button>)}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  employees: state.employees,
})

let mapDispatchToProps = (dispatch) => ({
  employeeUpdate: (data) => dispatch(employee.updateRequest(data)),
  employeeDestroy: (data) => dispatch(employee.destroyRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItem)
