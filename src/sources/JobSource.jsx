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
          if (job.isNew) {
            delete job.isNew
            fbRef.push(job)
            resolve(job)
          } else {
            fbRef.child(`${job.id-1}`).update(job)
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