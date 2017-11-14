import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

  render() {
    return (
      <nav className='navbar'>
        <ul>
          <li><Link to='/admin/employee'>Employee</Link></li>
          <li><Link to='/admin/product'>Product</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Navbar