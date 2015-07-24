import React from 'react'
import AltContainer from 'alt/AltContainer'
import Header from '../components/Header'
import Jobs from '../components/Jobs'
import Page from '../components/Page'
import UserStore from '../stores/UserStore'
import JobStore from '../stores/JobStore'
import AboutStore from '../stores/AboutStore'
import JobActions from '../actions/JobActions'
import AboutActions from '../actions/AboutActions'

class Home extends React.Component {
  componentDidMount() {
    UserStore.auth()
    JobStore.fetchJobs()
    AboutStore.fetchData()
  }

  render() {
    return (
      <AltContainer 
        stores={{
          userProps: UserStore,
          jobsProps: JobStore,
          about: AboutStore
        }}>
        <Header signOut={UserStore.signOut} />
        <Jobs />
        <Page 
          signIn={UserStore.signIn} 
          getJob={JobStore.getJob.bind(JobStore)} 
          jobSchema={JobStore.jobSchema} 
          setEditing={JobActions.setEditing.bind(JobActions)}
          saveJob={JobStore.save.bind(JobStore)}
          removeJob={JobStore.removeJob.bind(JobStore)}
          setEditingAbout={AboutActions.setEditing.bind(AboutActions)}
        />
      </AltContainer>
    )
  }
}

export default Home