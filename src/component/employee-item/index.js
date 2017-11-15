import './_employee-item.scss'
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
  }

  handleUpdate(employee){
    this.props.employeeUpdate(employee)
    this.setState({editing: false})
  }

  render(){
    let {
      employee,
      employeeDestroy,
      employeeUpdate,
    } = this.props

    let {editing} = this.state
    let employeeExpenses = expenses[employee.id]

    return (
      <div className='employee-item'>
        {util.renderIf(!editing,
          <div>
            <h2 onDoubleClick={() => this.setState({editing: true})}> {employee.name}: ${employee.budget} </h2>
            <button className='delete' onClick={() => employeeDestroy(employee)}> <span> delete </span> </button>
          </div>
        )}

        {util.renderIf(editing,
          <EmployeeForm employee={employee} onComplete={this.handleUpdate} />)}

        <ExpenseForm employee={employee} onComplete={expenseCreate}/>

        <main className='expense-container'>
          {employeeExpenses.map((expense, i) =>
            <ExpenseItem expense={expense} key={i} />
          )}
        </main>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  expenses: state.expenses,
})

let mapDispatchToProps = (dispatch) => ({
  employeeUpdate: (data) => dispatch(employee.update(data)),
  employeeDestroy: (data) => dispatch(employee.destroy(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItem)
