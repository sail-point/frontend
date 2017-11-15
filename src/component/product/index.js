import React from 'react'
import {connect} from 'react-redux'
import ProductItem from '../product-item'
import ProductForm from '../product-form'
import * as product from '../../action/product.js'

class Product extends React.Component {
  constructor(props) {
    super(props)

    this.updateComponent = this.updateComponent.bind(this)
    this.destroyProduct = this.destroyProduct.bind(this)
    this.productUpdate = this.productUpdate.bind(this)
  }

  updateComponent(data) {
    this.props.submit(data)
      .then(() => {
        this.forceUpdate()
      })
  }

  productUpdate(product) {
    this.props.update(product)
      .then(() => {
        this.forceUpdate()
      })
  }

  destroyProduct(product) {
    this.props.destroy(product)
      .then(() => {
        this.forceUpdate()
      })
  }

  componentWillMount() {
    this.props.fetch()
      .then(() => {
        this.forceUpdate()
      })
  }

  render(){
    let {
      removeProduct,
      updateProduct,
    } = this.props
    //let {editing} = this.props
    return (
      <div className='product'>
        <h1> Products </h1>
        <ProductForm onComplete={this.updateComponent}/>
        {this.props.products.data.map((item, i) =>
          <ProductItem
            key={i}
            product={item}
            destroyProduct={this.destroyProduct}
            productUpdate={this.productUpdate}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
})

const mapDispatchToProps = (dispatch) => ({
  submit: (data) => dispatch(product.create(data)),
  fetch: () => dispatch(product.fetch()),
  destroy: (data) => dispatch(product.destroy(data)),
  update: (data) => dispatch(product.update(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)
