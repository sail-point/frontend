import React from 'react'
import {connect} from 'react-redux'
import ProductForm from '../product-form'
import * as util from '../../lib/util.js'
import * as Product from '../../action/product.js'

class ProductItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      editing: false,
    }

    this.handleDestroy = this.handleDestroy.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleDestroy(){
    this.props.destroyProduct(this.props.product)
  }

  handleUpdate(product){
    this.props.productUpdate(product)
    this.setState({editing: false})
  }

  render(){
    let {
      product,
      productCreate,
    } = this.props
    return (
      <div className='product-item'>
        <div>
          { !this.state.editing ?
            <div>
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.category}</p>
              <button onClick={this.handleDestroy}>Delete </button>
              <p>
                <button onClick={() => this.setState({editing: true})}>
              edit product
                </button>
              </p>
            </div>
            :
            <div>
              <ProductForm product={product} onComplete={this.handleUpdate} />
              <p>
                <button onClick={() => this.setState({editing: false})}>
                cancel
                </button>
              </p>
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  productCreate: (product) => dispatch(Product.create(product)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
