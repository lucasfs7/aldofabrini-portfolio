import alt from '../alt'

class JobActions {
  updateJobs(jobs) {
    this.dispatch(jobs)
  }
}

export default alt.createActions(JobActions)