import './order.scss'
import React from 'react'
import {connect} from 'react-redux'
import OrderItem from '../order-item'
import OrderForm from '../order-form'
import * as util from '../../lib/util.js'
import * as product from '../../action/product.js'
import * as order from '../../action/order.js'


class Order extends React.Component {
  constructor(props) {
    super(props)

    if(!props.employee)
      this.props.history.push('/employee/login')

    this.state = {
      open: true,
      close: false,
    }
    this.updateComponent = this.updateComponent.bind(this)
    this.closeOrder = this.closeOrder.bind(this)
    this.orderUpdate = this.orderUpdate.bind(this)
  }

  updateComponent(data) {
    this.props.submit(data)
      .then(() => {
        this.forceUpdate()
      })
  }

  orderUpdate(order) {
    this.props.update(order)
      .then(() => {
        this.forceUpdate()
      })
  }

  closeOrder(order) {
    let data = {...order}
    data.isOpen = false
    console.log('THE DATA', data)
    this.props.close(data)
      .then(() => {
        this.forceUpdate()
      })
  }

  componentWillMount() {
    this.props.productFetch()
      .then(() => {
        this.props.orderFetch()
      })
      .then(() => {
        this.forceUpdate()
      })
  }


  render(){
    let {
      orders,
      products,
      employee,
      removeOrder,
      updateOrder,
    } = this.props

    let {
      open,
      close,
    } = this.state

    return (
      <div className='order'>
        <h1> Orders </h1>
        <OrderForm employee={employee} products={products} onComplete={this.updateComponent}/>
        <button onClick={() => this.setState({open: true, close: false})}> Open Orders </button>
        <button onClick={() => this.setState({open: false, close: true})}> Closed Orders </button>
        {util.renderIf(open,
          <div>
            {orders.data.map((item, i) => {
              if(item.isOpen)
                return <OrderItem
                  key={i}
                  order={item}
                  products={products}
                  closeOrder={this.closeOrder}
                  orderUpdate={this.orderUpdate}
                />
            })}
          </div>
        )}
        {util.renderIf(close,
          <div>
            {orders.data.map((item, i) => {
              if(!item.isOpen)
                return <OrderItem
                  key={i}
                  order={item}
                  products={products}
                  closeOrder={this.closeOrder}
                  orderUpdate={this.orderUpdate}
                />
            })}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders,
  employee: state.employee,
  products: state.products,
})

const mapDispatchToProps = (dispatch) => ({
  submit: (data) => dispatch(order.create(data)),
  orderFetch: () => dispatch(order.fetch()),
  productFetch: () => dispatch(product.fetch()),
  close: (data) => dispatch(order.close(data)),
  update: (data) => dispatch(order.close(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)
