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

    this.handleCreate = this.handleCreate.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleCreate(product){
    this.props.productCreate(product)
      .then(() => {
        this.props.history.push('/admin/product')
      })
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
      <div>
        <h1>Product</h1>
        { product ?
          <div>
            <h2>{product.name}</h2>
            { this.state.editing ?
              <div>
                <ProductForm product={product} onComplete={this.handleUpdate} />
                <p>
                  <button onClick={() => this.setState({editing: false})}>
                  cancel
                  </button>
                </p>
              </div>
              :
              <p>
                <button onClick={() => this.setState({editing: true})}>
                edit product
                </button>
              </p>
            }
          </div>
          :
          <ProductForm onComplete={this.handleCreate} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  product: state.Product,
})

const mapDispatchToProps = (dispatch) => ({
  productCreate: (product) => dispatch(Product.create(product)),
  productUpdate: (product) => dispatch(Product.update(product)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
