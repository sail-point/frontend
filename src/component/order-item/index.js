import './order-item.scss'
import React from 'react'
import {connect} from 'react-redux'
import OrderForm from '../order-form'
import * as util from '../../lib/util.js'
import * as order from '../../action/order.js'

class OrderItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(order){
    this.props.orderUpdate(order)
    this.setState({editing: false})
  }

  render(){
    let {
      order,
      closeOrder,
    } = this.props
    return (
      <div className='order-item'>
        <div>
          { !this.state.editing ?
            <div>
              <p><strong>Employee:</strong> {order.employee.firstName} {order.employee.lastName}</p>
              {order.products.map((item, i) => (<p key={i}>{item.name} ${item.price}</p>))}
              <p><strong>Total:</strong> ${order.amount}</p>
              <p><strong>Status:</strong> {order.isOpen ? <span style={{color: 'green'}}>Open</span> : <span style={{color: 'red'}}>Closed</span> }</p>
              {util.renderIf(closeOrder,
                <div>
                  <button className='close' onClick={() => closeOrder(order)}>Close</button>
                  <button className='edit' onClick={() => this.setState({editing: true})}>Edit</button>
                </div>
              )}
            </div>
            :
            <div>
              <OrderForm order={order} onComplete={this.handleUpdate} />
              <p>
                <button onClick={() => this.setState({editing: false})}>
                Cancel
                </button>
              </p>
            </div>
          }
        </div>
      </div>
    )
  }
}


export default OrderItem
