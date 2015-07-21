import React from 'react'
import AltContainer from 'alt/AltContainer'
import Header from '../components/Header'
import Jobs from '../components/Jobs'
import Page from '../components/Page'
import UserStore from '../stores/UserStore'
import JobStore from '../stores/JobStore'

class Home extends React.Component {
  componentDidMount() {
    UserStore.auth()
    JobStore.fetchJobs()
  }

  render() {
    return (
      <AltContainer store={UserStore}>
        <Header signOut={UserStore.signOut} />
        <AltContainer store={JobStore}>
          <Jobs />
        </AltContainer>
        <Page signIn={UserStore.signIn} />
      </AltContainer>
    )
  }
}

export default Home