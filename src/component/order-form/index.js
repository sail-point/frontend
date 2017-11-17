import './order-form.scss'
import React from 'react'
import * as util from '../../lib/util.js'


class OrderForm extends React.Component {
  constructor(props){
    super(props)

    this.emptyState = {
      employee: props.employee ? props.employee._id : 'Nobody',
      products: [],
      amount: 0,
    }
    this.state = props.order ? {...this.emptyState, ...props.order} : this.emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.deleteProduct = this.deleteProduct.bind(this)
  }

  handleAdd(e){
    e.preventDefault()
    let options = e.target.parentNode.selection.options
    let temp = options[options.selectedIndex].value
    let selection = this.props.products.data.find((item, i) => (
      item.name === temp
    ))
    this.setState(prevState => {
      return {...prevState, products: [...prevState.products, selection], amount: prevState.amount + selection.price}
    })
  }

  deleteProduct(e) {
    e.preventDefault()
    let removeThis = e.target.parentNode.id
    this.setState(prevState => {
      return {...prevState,
        amount: prevState.amount - prevState.products.reduce((acc, item) => {
          if (item._id === removeThis)
            return acc + item.price
          return acc
        }, 0),
        products: prevState.products.filter(item => {
          return item._id !== removeThis}
        )}
    })}

  handleSubmit(e){
    e.preventDefault()
    // add product id to product array.
    this.props.onComplete(this.state)
  }

  render(){
    let {
      employee,
      products,
    } = this.props
    return (
      <form className='order-form'>
        <label htmlFor='firstName'>Employee</label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          value={employee ? employee.firstName : 'Nobody'}
          disabled='true'
        />
        <select id='selection'>
          {products.data.map((item, i) => (
            <option key={i}>{item.name}</option>
          ))}
        </select>
        <button onClick={this.handleAdd}>+</button>
        {this.state.products.map((item, i) => {
          return <p id={item._id} key={i}>{item.name} ${item.price}
            <button onClick={this.deleteProduct}>Delete</button>
          </p>
        })}
        <p>Total: ${this.state.amount}</p>
        <button onClick={this.handleSubmit} className='submit-order' type='submit'>{this.props.order ? 'Update' : 'Create'} </button>
      </form>
    )
  }
}


export default OrderForm
