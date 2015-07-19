import React from 'react'
import AltContainer from 'alt/AltContainer'
import Jobs from '../components/Jobs'
import JobStore from '../stores/JobStore'

class JobsList extends React.Component {
  componentDidMount() {
    JobStore.fetchJobs();
  }

  render() {
    return (
      <AltContainer store={JobStore}>
        <Jobs />
      </AltContainer>
    );
  }
}

export default JobsList
