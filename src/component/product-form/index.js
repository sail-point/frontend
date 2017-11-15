import './product-form.scss'
import React from 'react'
import * as util from '../../lib/util.js'

let emptyState = {
  name: '',
  nameDirty: false,
  nameError: 'Name is required',
  price: '',
  priceDirty: false,
  priceError: 'Price is required',
  category: '',
  categoryDirty: false,
  categoryError: '',
  available: false,
}

class ProductForm extends React.Component {
  constructor(props){
    super(props)
    this.state = props.product ? {...emptyState, ...props.product} : emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleValidate = this.handleValidate.bind(this)
  }

  handleChange(e){
    let {name, value, type, checked} = e.target
    if (type === 'checkbox') {
      this.setState({available: checked})
    }
    else {
      this.setState({
        [name]: value,
        [name+'Dirty']: true,
        [name+'Error']: this.handleValidate(e.target),
      })
    }
  }

  handleSubmit(e){
    e.preventDefault()

    if (!this.state.name)
      this.setState({nameDirty: true})
    if (!this.state.price)
      this.setState({priceDirty: true})

    if (this.state.name && this.state.price) {
      this.props.onComplete(this.state)
      this.setState(emptyState)
    }
  }

  handleValidate({type, placeholder, value}){
    switch(type){
      case 'text':
        if(value.length === 0)
          return placeholder + ' is required'
        return null
      case 'number':
        if(value.length === 0)
          return placeholder + ' is required'
        return null
      default:
        return null
    }
  }

  render(){
    return (
      <form
        className='product-form'
        onSubmit={this.handleSubmit}>
        <p>
          <input
            type='text'
            id='name'
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            placeholder='Name'
          />
          <span style={{fontSize: '1.2em', color: 'red'}}>* </span>
          {util.renderIf(this.state.nameDirty,
            <label style={{color: 'red'}} htmlFor='name'>{this.state.nameError}</label>
          )}
        </p>
        <p>
          <input
            type='text'
            id='category'
            name='category'
            value={this.state.category}
            onChange={this.handleChange}
            placeholder='Category'
          />
        </p>
        <p>
          <input
            type='number'
            id='price'
            name='price'
            value={this.state.price}
            onChange={this.handleChange}
            placeholder='Price'
          />
          <span style={{fontSize: '1.2em', color: 'red'}}>* </span>
          {util.renderIf(this.state.priceDirty,
            <label style={{color: 'red'}} htmlFor='price'>{this.state.priceError}</label>
          )}
        </p>

        <label htmlFor='available'>Available</label>
        <input
          type='checkbox'
          id='available'
          name='available'
          checked={this.state.available}
          onChange={this.handleChange}
        />

        <p>
          <button type='submit'>{this.props.product ? 'Update' : 'Create'} </button>
        </p>
      </form>
    )
  }
}

export default ProductForm
