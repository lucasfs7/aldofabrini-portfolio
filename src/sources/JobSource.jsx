import JobActions from '../actions/JobActions'
import Firebase from 'firebase'
import { cloneDeep } from 'lodash'
const fbRef = new Firebase('https://aldo-fabrini-portfolio.firebaseio.com/jobs')

var JobSource = {
  fetchJobs() {
    return {
      remote() {
        return new Promise((resolve, reject) => {
          fbRef.on('value', dataSnapshot => {
            let data = dataSnapshot.val()
            if (data !== null) resolve(data)
            else reject('Nenhum job encontrado')
          })
        })
      },
      success: JobActions.updateJobs,
      error: JobActions.jobsFailed,
      loading: JobActions.fetchJobs
    }
  },
  save() {
    return {
      remote(store, job) {
        return new Promise((resolve, reject) => {
          if (!job.id) job.id = store.jobs.length + 1
          fbRef.child(`${job.id-1}`).update(job)
          if (job.isNew) {
            delete job.isNew
            resolve(job)
          } else {
            resolve()
          }
        })
      },
      success: JobActions.updateJob,
      error: JobActions.jobsFailed,
      loading: JobActions.save
    }
  },
  removeJob() { return {
      remote(store, id) {
        return new Promise((resolve, reject) => {
          var jobs = cloneDeep(store.jobs)
          jobs.splice((id - 1), 1)
          if (jobs.length) jobs.forEach((job, i) => job.id = i+1)
          fbRef.set(jobs)
          resolve(jobs)
        })
      },
      success: JobActions.jobRemoved,
      error: JobActions.jobsFailed,
      loading: JobActions.removeJob
    }
  }
}

export default JobSource