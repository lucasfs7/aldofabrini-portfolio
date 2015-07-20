import React from 'react'

class Login extends React.Component {
  render() {
    return (
      <form>
        <input type="email" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="Senha" />
        <button type="submit" />
      </form>
    )
  }
}

export default Login