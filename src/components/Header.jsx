import React from 'react'

class Header extends React.Component {
  handleSignOut(e) {
    e.preventDefault()
    this.props.signOut()
  }

  render() {
    var userProps = this.props.userProps
    var btns = []
    if (userProps.user.uid) {
      btns.push(<a className="btn" href="#new"><i className="fa fa-plus" /></a>)
      btns.push(<button className="btn" onClick={this.handleSignOut.bind(this)}>sign out</button>)
    }
    btns.push(<a className="btn" href="#about">about</a>)
    return (
      <header className="app-header">
        <h1>Aldo Fabrini</h1>
        <ul className="btns-list">
          {btns.map((btn, i) => (<li key={i}>{btn}</li>))}
        </ul>
      </header>
    )
  }
}

export default Header
