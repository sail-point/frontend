import React from 'react'
import * as util from '../../lib/util.js'

let emptyState = {
  name: '',
  nameDirty: false,
  nameError: 'Name is required.',
  price: '',
  category: '',
}

class ProductForm extends React.Component {
  constructor(props){
    super(props)
    this.state = props.products ? {...emptyState, ...props.product} : emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleValidate = this.handleValidate.bind(this)
  }

  componentWillReceiveProps(props){
    if(props.product)
      this.setState(props.product)
  }

  componentDidMount(){
    console.log('mounted')
  }

  handleChange(e){
    let {name, value} = e.target
    this.setState({
      [name]: value,
      [name+'Dirty']: true,
      [name+'Error']: this.handleValidate(e.target),
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(emptyState)
  }

  handleValidate({type, placeholder, value}){
    switch(type){
      case 'text':
        if(value.length === 0)
          return placeholder + ' is required.'
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

        {util.renderIf(this.state.nameDirty,
          <p>{this.state.nameError}</p>
        )}
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='Name'
        />

        <label htmlFor='price'>Price</label>
        <input
          id='price'
          name='price'
          value={this.state.price}
          onChange={this.handleChange}
          placeholder='Price'
        />

        <label htmlFor='category'>Category</label>
        <input
          id='category'
          name='category'
          value={this.state.category}
          onChange={this.handleChange}
          placeholder='Category'
        />

        <label htmlFor='available'>Available</label>
        <input
          type='checkbox'
          id='available'
          name='available'
          value={this.state.available}
          onChange={this.handleChange}
        />

        <p>
          <button type='submit'>{this.props.product ? 'update' : 'create'} product</button>
        </p>
      </form>
    )
  }
}

export default ProductForm
