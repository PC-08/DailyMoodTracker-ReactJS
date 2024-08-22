import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPass: false,
    errorMsg: '',
    showSubmitError: false,
  }

  onUserNameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onShowPasswordToogle = () => {
    const {showPass} = this.state
    this.setState({showPass: !showPass})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showSubmitError, showPass} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const inputType = showPass ? 'text' : 'password'

    return (
      <div className="login-bg">
        <form className="login-card">
          <h1 className="login-head">Daily Mood Tracker</h1>
          <div className="login-input-con">
            <label className="login-label" htmlFor="userName">
              USERNAME
            </label>
            <input
              value={username}
              onChange={this.onUserNameChange}
              className="login-input"
              id="userName"
              type="text"
            />
          </div>
          <div className="login-input-con">
            <label className="login-label" htmlFor="passWord">
              PASSWORD
            </label>
            <input
              value={password}
              onChange={this.onPasswordChange}
              className="login-input"
              id="passWord"
              type={inputType}
            />
            <div>
              <input
                onChange={this.onShowPasswordToogle}
                className="login-checkbox"
                id="showPass"
                type="checkbox"
              />
              <label className="login-label" htmlFor="showPass">
                Show Password
              </label>
            </div>
          </div>

          <button onClick={this.submitForm} className="login-btn" type="submit">
            Login
          </button>
          {showSubmitError && <p className="login-errormessage">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
