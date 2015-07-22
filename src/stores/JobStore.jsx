import alt from '../alt'
import { findWhere } from 'lodash'
import JobActions from '../actions/JobActions'
import JobSource from '../sources/JobSource'

class JobStore {
  constructor() {
    this.jobs = []
    this.errorMessage = null
    this.loading = false
    this.editing = false

    this.bindListeners({
      handleUpateJobs: JobActions.UPDATE_JOBS,
      handleFetchJobs: JobActions.FETCH_JOBS,
      handleJobsFailed: JobActions.JOBS_FAILED,
      handleSetEditing: JobActions.SET_EDITING,
      handleSave: JobActions.SAVE,
      handleUpdateJob: JobActions.UPDATE_JOB,
      handleRemoveJob: JobActions.REMOVE_JOB,
      handleRemovedJob: JobActions.JOB_REMOVED
    })

    this.exportAsync(JobSource)
  
    this.exportPublicMethods({
      getJob: this.getJob,
      jobSchema: this.jobSchema
    })
  }
  
  handleSave() {
    this.loading = true
  }
  
  handleRemoveJob() {
    this.loading = true
  }
  
  handleRemovedJob(jobs) {
    this.loading = false
    this.jobs = jobs
  }
  
  handleSetEditing(val) {
    if (typeof(val) === 'boolean')
      this.editing = val
  }
  
  jobSchema() {
    return ({
      name: {
        short: 'Short title',
        long: 'Job title'
      },
      client: {
        short_name: 'Client',
        name: 'Client name'
      },
      description: 'Job descrption goes here',
      images: []
    })
  }

  handleUpdateJob(job) {
    this.loading = false
    if (job) this.jobs.push(job)
  }

  handleUpateJobs(jobs) {
    this.loading = false
    if (this.jobs.length) {
      jobs.forEach((job, i) => job.id = i+1)
    }
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
    var jobs = [], job
    if (!slug) return null
    jobs = this.getState().jobs
    if (!jobs.length) return null
    job = findWhere(jobs, {slug: slug})
    if (!job) return null
    return job
  }
}

export default alt.createStore(JobStore, 'JobStore')