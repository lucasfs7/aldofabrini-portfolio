import alt from '../alt'
import { findWhere } from 'lodash'
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
  
    this.exportPublicMethods({
      getJob: this.getJob
    })
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
  
  getJob(slug) {
    var jobs = []
    var job = {}
    if (!slug) return null
    jobs = this.getState().jobs
    if (!jobs.length) return null
    job = findWhere(jobs, {slug: slug})
    if (!job) return null
    return job
  }
}

export default alt.createStore(JobStore, 'JobStore')