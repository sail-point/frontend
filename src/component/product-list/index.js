import React from 'react'
import {connect} from 'react-redux'
import ProductItem from '../product-item'

class ProductList extends React.Component {
  render(){
    let {
      removeProduct,
      updateProduct,
    } = this.props

    //let {editing} = this.props

    return (
      <ul className='product-list'>
        {this.props.products.map((product, i) =>
          <ProductItem
            key={i}
            product={product}
            removeProduct={removeProduct}
            updateProduct={updateProduct}
          />
        )}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: !!state.token,
})

export default connect(mapStateToProps)(ProductList)
