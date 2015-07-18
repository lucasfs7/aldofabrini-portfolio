import React from 'react'
import AltContainer from 'alt/AltContainer'

class Header extends React.Component {
  render() {
    return (
      <AltContainer>
        <h1>Aldo Fabrini</h1>
        <a href="/about">about</a>
      </AltContainer>
    )
  }
}

export default Header
