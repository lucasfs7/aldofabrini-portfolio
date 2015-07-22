import JobActions from '../actions/JobActions'
import Firebase from 'firebase'
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
  }
}

export default JobSource