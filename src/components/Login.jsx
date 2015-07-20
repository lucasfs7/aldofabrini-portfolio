import React from 'react'

class Login extends React.Component {
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
    var message = ''
  
    if (this.props.user.uid) {
      window.location.hash = ''
      return (<div className="hidden"></div>)
    }
  
    if (this.props.loading) {
      return (
        <p>authenticating</p>
      )
    }

    if (this.props.errorMessage) {
      message = <p className="msg error">{this.props.errorMessage}</p>
    }

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {message}
        <input type="email" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    )
  }
}

export default Login