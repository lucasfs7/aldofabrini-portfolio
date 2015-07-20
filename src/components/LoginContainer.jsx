import React from 'react'
import Login from '../components/Login'
import AltContainer from 'alt/AltContainer'
import UserStore from '../stores/UserStore'
import UserActions from '../actions/UserActions'

class LoginContainer extends React.Component {
  render() {
    return (
      <AltContainer store={UserStore} actions={UserActions}>
        <Login />
      </AltContainer>
    )
  }
}

export default LoginContainer