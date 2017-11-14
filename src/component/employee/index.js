import React from 'react'
import {connect} from 'react-redux'
import EmployeeForm from '../employee-form'
import * as util from '../../lib/util.js'
import * as businessEmployee from '../../action/business-employee.js'

class Employee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
    }

    this.handleCreate = this.handleCreate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleCreate(employee){
    this.props.employeeCreate(employee)
    .then(() => {
      this.props.history.push('/dashboard')
    })
  }

  handleUpdate(employee){
    this.props.employeeUpdate(employee)
    this.setState({editing: false})
  }

  handleDelete(employee){
    this.props.employeeDelete(employee)
    .then(() => {
      this.props.history.push('/dashboard')
    })
  }

  render(){
    let {
      employee,
      employeeCreate,
    } = this.props

    return (
      <div className='employee'>
        <h2> Employee </h2>
        { employee ?
          <div>
              { this.state.editing ?
              <div>
                <EmployeeForm employee={employee} onComplete={this.handleUpdate} />
                <button onClick={() => this.setState({editing: false})}>
                  Cancel
                </button>
              </div>
            :
              <div>
                <p>Name: {employee.firstName} {employee.lastName}</p>
                <p>City: {employee.city} </p>
                <p>State: {employee.state} </p>
                <p>Donation Goal: {employee.donationGoal} </p>
                <p>Money Spent: {employee.moneySpent} </p>
                <p>Bio: {employee.bio} </p>
                <button onClick={() => this.setState({editing: true})}>
                  Edit Employee
                </button>
              </div>
            }
          </div>
        :
          <EmployeeForm onComplete={this.handleCreate} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  employee: state.businessEmployee,
})

const mapDispatchToProps = (dispatch) => ({
  employeeCreate: (employee) => dispatch(businessEmployee.create(employee)),
  employeeUpdate: (employee) => dispatch(businessEmployee.update(employee)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Employee)
