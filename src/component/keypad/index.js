import './keypad.scss'
import React from 'react'
import * as util from '../../lib/util.js'

let emptyState = {
  pinCount: 0,
  pinDirty: false,
  pinError: 'Incorrect PIN',
  pinClass: 'pinBox',
}

class Keypad extends React.Component {
  constructor(props) {
    super(props)

    this.state = emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel(e) {
    this.setState({pinCount: 0})
    // Dispatch action to reset pin
  }

  handleSubmit(e) {
    this.setState({pinCount: 0, pinDirty: true, pinClass: 'pinBox shaker'})
    setTimeout(() => this.setState({pinClass: 'pinBox'}), 250)
    // Dispatch action to send pin
  }

  handleClick(e) {
    let number = e.target.name
    number = number.charAt(number.length-1)
    this.setState(prevState => {
      return {pinCount: prevState.pinCount+1}
    })

    // Take out setTimeout when able to send to back end
    if (this.state.pinCount === 3) {
      setTimeout(this.handleSubmit, 250)
    }
  }

  render(){
    let {pinCount, pinDirty, pinError, pinClass} = this.state
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let pin = ['0', '1', '2', '3']
    let classText
    return (
      <div className='keypad'>
        {util.renderIf(pinDirty, <p className='error'>{pinError}</p>)}
        <div className={pinClass}>
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
        {util.renderIf(pinCount, <button onClick={this.handleCancel}>Cancel</button>)}
      </div>
    )
  }
}



export default (Keypad)
