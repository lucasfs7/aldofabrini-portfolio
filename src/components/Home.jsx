import React from 'react'
import AltContainer from 'alt/AltContainer'
import Header from '../components/Header'
import JobsList from '../components/JobsList'

class Home extends React.Component {
  render() {
    return (
      <AltContainer>
        <Header />
        <JobsList />
      </AltContainer>
    )
  }
}

export default Home