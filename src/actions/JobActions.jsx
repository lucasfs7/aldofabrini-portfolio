import alt from '../alt'

class JobActions {
  updateJobs(jobs) {
    this.dispatch(jobs)
  }

  updateJob(job) {
    this.dispatch(job)
  }

  fetchJobs() {
    this.dispatch()
  }

  jobsFailed(errorMessage) {
    this.dispatch(errorMessage)
  }
  
  setEditing(val) {
    this.dispatch(val)
  }
  
  save(job) {
    this.dispatch()
  }

  jobRemoved(jobs) {
    this.dispatch(jobs)
  }

  removeJob(id) {
    this.dispatch()
  }
}

export default alt.createActions(JobActions)