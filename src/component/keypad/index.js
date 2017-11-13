import React from 'react'

class Keypad extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  render(){
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    return (
      <div className='keypad'>
        {numbers.map(number => {
          <button
            name={`num${number}`}
            onClick={this.handleClick}
          >{number}
          </button>
        })}
      </div>
    )
  }
}



export default (Keypad)
