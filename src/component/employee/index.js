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
  }

  handleCreate(employee){
    this.props.employeeCreate(employee)
      .then(() => {
        this.props.history.push('/admin/employee')
      })
  }

  componentWillMount(){
    this.props.employeeFetchAll()
  }

  render(){
    let {
      employees,
      employeeCreate,
    } = this.props

    return (
      <div className='employee'>
        <h2> Employees </h2>
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
  employeeCreate: (data) => dispatch(employee.createRequest(data)),
  employeeFetchAll: () => dispatch(employee.fetchAll()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Employee)
