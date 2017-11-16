import './product-view.scss'
import React from 'react'
import {connect} from 'react-redux'
import ProductItem from '../product-item'
import ProductForm from '../product-form'
import * as product from '../../action/product.js'

class ProductView extends React.Component {
  constructor(props) {
    super(props)

    if(!props.employee)
      this.props.history.push('/employee/login')
  }

  componentWillMount() {
    this.props.fetch()
      .then(() => {
        this.forceUpdate()
      })
  }

  render(){
    let {
      products,
      fetch,
    } = this.props

    return (
      <div className='product-view'>
        <h2 className='title'> Products </h2>
        {products.data.map((item, i) =>
          <ProductItem
            key={i}
            product={item}
          />
        )}
        <button onClick={fetch}>Refresh</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
})

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(product.fetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductView)
