import React from 'react'

class Header extends React.Component {
  handleSignOut(e) {
    e.preventDefault()
    this.props.signOut()
  }

  render() {
    return (
      <header>
        <h1>Aldo Fabrini</h1>
        <a href="#about">about</a>
        {(this.props.user.uid
        ? <button type="button" onClick={this.handleSignOut.bind(this)}>sign out</button>
        : '')}
      </header>
    )
  }
}

export default Header
