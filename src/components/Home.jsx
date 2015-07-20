import React from 'react'
import AltContainer from 'alt/AltContainer'
import Header from '../components/Header'
import JobsList from '../components/JobsList'
import Page from '../components/Page'
import UserStore from '../stores/UserStore'

class Home extends React.Component {
  componentDidMount() {
    UserStore.auth()
  }

  render() {
    return (
      <AltContainer store={UserStore}>
        <Header signOut={UserStore.signOut} />
        <JobsList />
        <Page />
      </AltContainer>
    )
  }
}

export default Home