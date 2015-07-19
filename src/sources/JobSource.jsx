import JobActions from '../actions/JobActions'
import Firebase from 'firebase'

var JobSource = {
  fetchJobs() {
    return {
      remote() {
        return new Promise((resolve, reject) => {
          const fbRef = new Firebase('https://aldo-fabrini-portfolio.firebaseio.com/jobs')
          fbRef.on('value', dataSnapshot => {
            let data = dataSnapshot.val()
            console.log(data)
            if (data !== null) {
              resolve(data)
            } else {
              reject('Nenhum job encontrado')
            }
          })
        })
      },
      success: JobActions.updateJobs,
      error: JobActions.jobsFailed,
      loading: JobActions.fetchJobs
    }
  }
}

export default JobSource