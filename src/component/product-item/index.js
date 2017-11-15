import './product-item.scss'
import React from 'react'
import {connect} from 'react-redux'
import ProductForm from '../product-form'
import * as util from '../../lib/util.js'
import * as product from '../../action/product.js'

class ProductItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(product){
    this.props.productUpdate(product)
    this.setState({editing: false})
  }

  render(){
    let {
      product,
      destroyProduct,
    } = this.props
    return (
      <div className='product-item'>
        <div>
          { !this.state.editing ?
            <div>
              <p><strong>Item:</strong> {product.name}</p>
              <p><strong>Price:</strong> {product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Availability:</strong> {product.available ? <span style={{color: 'green'}}>In Stock</span> : <span style={{color: 'red'}}>Out of Stock</span> }</p>
              <button className='delete' onClick={() => destroyProduct(product)}>Delete</button>
              <button className='edit' onClick={() => this.setState({editing: true})}>Edit</button>
            </div>
            :
            <div>
              <ProductForm product={product} onComplete={this.handleUpdate} />
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


export default ProductItem
