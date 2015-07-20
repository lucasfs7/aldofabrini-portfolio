import alt from '../alt'

class UserActions {
  updateUser(user) {
    this.dispatch(user)
  }

  signIn() {
    this.dispatch();
  }

  userFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

}

export default alt.createActions(UserActions)