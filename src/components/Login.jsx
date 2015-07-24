import React from 'react'

class Login extends React.Component {
  handleClose(e) {
    e.preventDefault()
    window.location.hash = ''
  }

  handleSubmit(e) {
    e.preventDefault()
    let form = e.target
    let credentials = {
      email: form['email'].value,
      password: form['password'].value
    }
    this.props.signIn(credentials)
  }

  render() {
    var userProps = this.props.userProps
    var message = ''
  
    console.log(userProps.user)
    if (userProps.user.uid) {
      window.location.hash = ''
      return (<div className="hidden"></div>)
    }
  
    if (userProps.loading) {
      message = (<p className="msg">authenticating</p>)
    }

    if (userProps.errorMessage) {
      message = <p className="msg error">{userProps.errorMessage}</p>
    }

    return (
      <form className="page page-login" onSubmit={this.handleSubmit.bind(this)}>
        <ul className="btns-list">
          <li>
            <button className="btn" onClick={this.handleClose.bind(this)}>
              <i className="fa fa-times" />
            </button>
          </li>
        </ul>
        {message}
        <input type="email" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="Senha" />
        <button type="submit" className="btn">Entrar</button>
      </form>
    )
  }
}

export default Login