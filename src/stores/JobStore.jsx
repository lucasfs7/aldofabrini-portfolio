import alt from '../alt'
import JobActions from '../actions/JobActions'
import JobSource from '../sources/JobSource'

class JobStore {
  constructor() {
    this.jobs = []
    this.errorMessage = null
    this.loading = false

    this.bindListeners({
      handleUpateJobs: JobActions.UPDATE_JOBS,
      handleFetchJobs: JobActions.FETCH_JOBS,
      handleJobsFailed: JobActions.JOBS_FAILED
    })
    
    this.exportAsync(JobSource)
  }

  handleUpateJobs(jobs) {
    this.loading = false
    this.jobs = jobs
  }

  handleFetchJobs() {
    this.loading = true
    this.jobs = []
  }

  handleJobsFailed(errorMessage) {
    this.loading = false
    this.errorMessage = errorMessage
  }
}

export default alt.createStore(JobStore, 'JobStore')