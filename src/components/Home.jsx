import React from 'react'
import Header from '../components/Header'
import JobsList from '../components/JobsList'
import Page from '../components/Page'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <JobsList />
        <Page />
      </div>
    )
  }
}

export default Home