import alt from '../alt'
import UserActions from '../actions/UserActions'
import UserSource from '../sources/UserSource'

class UserStore {
  constructor() {
    this.user = {}
    this.errorMessage = null
    this.loading = false

    this.bindListeners({
      handleUpateUser: UserActions.UPDATE_USER,
      handleSignIn: UserActions.SIGN_IN,
      handleUserFailed: UserActions.USER_FAILED
    })
    
    this.exportAsync(UserSource)
  }

  handleUpateUser(user) {
    this.loading = false
    this.user = user
  }

  handleSignIn() {
    this.loading = true
    this.user = {}
  }

  handleUserFailed(errorMessage) {
    this.loading = false
    this.errorMessage = errorMessage
  }
}

export default alt.createStore(UserStore, 'UserStore')