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
            <p>Name: {employee.firstName} {employee.lastName}</p>
            <p>Title: {employee.title} </p>
            <p>Email: {employee.email} </p>
            <p>Phone: {employee.phoneNumber} </p>
            <p>Hours per week: {employee.hoursPerWeek} </p>
            <p>Salary per hour: {employee.salaryPerHour} </p>
            <p>Pin: {employee.pin} </p>
            <p>Hired: {employee.hired} </p>
            <p>Terminated: {employee.terminated} </p>
            <button className='update' onClick={() => this.setState({editing: true})}> Update </button>
            <button className='delete' onClick={() => employeeDestroy(employee)}> Delete </button>
          </div>
        )}

        {util.renderIf(editing,
          <EmployeeForm employee={employee} onComplete={this.handleUpdate} />)}
          <button onClick={() => this.setState({editing: false})}>
            Cancel
          </button>
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
