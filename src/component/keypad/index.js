import './keypad.scss'
import React from 'react'
import { connect } from 'react-redux'
import * as util from '../../lib/util.js'
import * as keypad from '../../action/keypad.js'

let emptyState = {
  pin: null,
  pinCount: 0,
  pinDirty: false,
  pinClass: 'pinBox',
  pinError: 'Incorrect PIN',
  pinPrompt: 'Type your PIN',
}

class Keypad extends React.Component {
  constructor(props) {
    super(props)

    this.state = emptyState
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleClear(e) {
    this.setState({ pin: '', pinCount: 0, pinDirty: false })
  }

  handleSubmit() {
    this.props.logIn(this.state.pin)
      .then(action => {
        console.log(`${this.props.employee.firstName} has logged in.`)
        this.setState(emptyState)
        this.props.history.push('/employee/dashboard')
      })
      .catch(() => {
        this.setState({ pin: '', pinCount: 0, pinDirty: true, pinClass: 'pinBox shaker' })
        setTimeout(() => this.setState({ pinClass: 'pinBox' }), 250)
      })
  }

  handleClick(e) {
    let number = e.target.name
    number = number.charAt(number.length - 1)
    this.setState(prevState => {
      let prevPin = ''
      if (prevState.pin)
        prevPin = prevState.pin
      return { pin: prevPin + number, pinCount: prevState.pinCount + 1 }
    }, () => {

      if (this.state.pinCount === 4)
        this.handleSubmit()
    })
  }

  render() {
    let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    let { pinCount, pinDirty, pinError, pinClass, pinPrompt } = this.state
    let pin = ['0', '1', '2', '3']
    let classText
    return (
      <div className='keypad'>
        <div className={pinClass}>
          {util.renderIf(pinDirty, <p className='error'>{pinError}</p>)}
          {util.renderIf(!pinDirty, <p className='pinPrompt'>{pinPrompt}</p>)}
          {pin.map((dot, i) => {
            classText = 'pinDot'
            if (pinCount >= Number(i) + 1)
              classText = 'pinDot shaded'
            return <span className={classText} key={i}></span>
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
        {util.renderIf(pinCount, <button className='buttonClear' onClick={this.handleClear}>Clear</button>)}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  employee: state.employee,
  token: state.token,
})

let mapDispatchToProps = (dispatch) => ({
  logIn: (pin) => dispatch(keypad.login(pin)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Keypad)
