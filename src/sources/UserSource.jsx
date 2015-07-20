import UserActions from '../actions/UserActions'
import Firebase from 'firebase'

var UserSource = {
  signIn(credentials) {
    return {
      remote() {
        return new Promise((resolve, reject) => {
          if (!crentials.email && !credentials.password) {
            reject('E-mail and password can\'t be blank.')
            return
          }
          const fbRef = new Firebase('https://aldo-fabrini-portfolio.firebaseio.com')
          fbRef.authWithPassword(credentials, (err, authData) => {
            if (err) reject(err.message)
            else resolve(authData)
          })
        })
      },
      success: UserActions.updateUser,
      error: UserActions.userFailed,
      loading: UserActions.signIn
    }
  }
}

export default UserSource