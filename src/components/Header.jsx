import React from 'react'

class Header extends React.Component {
  handleSignOut(e) {
    e.preventDefault()
    this.props.signOut()
  }

  render() {
    var btns = []
    if (this.props.user.uid) {
      btns.push(<a href="#new"><i className="fa fa-plus" />add job</a>)
      btns.push(<button type="button" onClick={this.handleSignOut.bind(this)}>sign out</button>)
    }
    btns.push(<a href="#about">about</a>)
    return (
      <header>
        <h1>Aldo Fabrini</h1>
        <ul className="btns-list">
          {btns.map((btn, i) => (<li key={i}>{btn}</li>))}
        </ul>
      </header>
    )
  }
}

export default Header
