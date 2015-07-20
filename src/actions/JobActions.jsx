import alt from '../alt'

class JobActions {
  updateJobs(jobs) {
    this.dispatch(jobs)
  }

  fetchJobs() {
    this.dispatch();
  }

  jobsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

}

export default alt.createActions(JobActions)