import alt from '../alt'

class UserActions {
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

export default alt.createActions(UserActions)