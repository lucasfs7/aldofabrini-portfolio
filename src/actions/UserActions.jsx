import alt from '../alt'

class JobActions {
  updateUser(jobs) {
    this.dispatch(jobs)
  }

  signIn() {
    this.dispatch();
  }

  userFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

}

export default alt.createActions(JobActions)