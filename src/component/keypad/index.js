import './keypad.scss'
import React from 'react'

class Keypad extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pinCount: 0,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel(e) {
    this.setState({pinCount: 0})
    // Dispatch action to reset pin
  }

  handleSubmit(e) {
    this.setState({pinCount: 0})
    // Dispatch action to send pin
  }

  handleClick(e) {
    let number = e.target.name
    number = number.charAt(number.length-1)
    this.setState(prevState => {
      return {pinCount: prevState.pinCount+1}
    })

    // Take this out when able to send pin to backend
    if (this.state.pinCount === 3) {
      this.setState({pinCount: 0})
    }

    // Dispatch action to update pin being sent
  }

  render(){
    let {pinCount} = this.state
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let pin = ['0', '1', '2', '3']
    let classText
    return (
      <div className='keypad'>
        <div className='pinBox'>
          {pin.map((dot, i) => {
            classText = 'pinDot'
            if (pinCount >= Number(i)+1)
              classText = 'pinDot shaded'
            return <span className ={classText} key={i}>O</span>
          })}
        </div>
        <div className='numPad'>
          {numbers.map((number, i) => {
            return <button
              name={`num${number}`}
              onClick={this.handleClick}
              key={i}
            >{number}
            </button>
          })}
        </div>
        {pinCount > 0 ? <button onClick={this.handleCancel}>Cancel</button> : undefined}
      </div>
    )
  }
}



export default (Keypad)
