import alt from '../alt'
import JobActions from '../actions/JobActions'

class JobStore {
  constructor() {
    this.jobs = []
    this.bindListeners({
      handleUpateJobs: JobActions.UPDATE_JOBS
    })
  }

  handleUpateJobs(jobs) {
    this.jobs = jobs
  }
}

export default alt.createStore(JobStore, 'JobStore')