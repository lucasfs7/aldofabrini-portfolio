import React from 'react'
import AltContainer from 'alt/AltContainer'
import Header from '../components/Header'
import Jobs from '../components/Jobs'
import Page from '../components/Page'
import UserStore from '../stores/UserStore'
import JobStore from '../stores/JobStore'
import JobActions from '../actions/JobActions'

class Home extends React.Component {
  componentDidMount() {
    UserStore.auth()
    JobStore.fetchJobs()
  }

  render() {
    return (
      <AltContainer 
        stores={{
          userProps: UserStore,
          jobsProps: JobStore
        }}>
        <Header signOut={UserStore.signOut} />
        <Jobs />
        <Page 
          signIn={UserStore.signIn} 
          getJob={JobStore.getJob.bind(JobStore)} 
          jobSchema={JobStore.jobSchema} 
          setEditing={JobActions.setEditing.bind(JobActions)}
        />
      </AltContainer>
    )
  }
}

export default Home