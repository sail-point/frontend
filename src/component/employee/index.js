import React from 'react'
import {connect} from 'react-redux'
import EmployeeItem from '../employee-item'
import EmployeeForm from '../employee-form'
import * as employee from '../../action/employee.js'

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
      this.props.history.push('/employee')
    })
  }

  render(){
    let {
      employees,
      employeeCreate,
    } = this.props

    return (
      <div className='employee'>
        <h2> Employee </h2>
        <EmployeeForm onComplete={employeeCreate} />
        <div className='employee-container'>
          {employees.map((employee, i) =>
            <EmployeeItem
              key={i}
              employee={employee}
            />
          )}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  employees: state.employees,
})

let mapDispatchToProps = (dispatch) => ({
  employeeCreate: (data) => dispatch(employee.create(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Employee)
