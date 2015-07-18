import React from 'react'
import Header from '../components/Header'
import JobsList from '../components/JobsList'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <JobsList />
      </div>
    )
  }
}

export default Home