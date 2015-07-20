import UserActions from '../actions/UserActions'
import Firebase from 'firebase'
const fbRef = new Firebase('https://aldo-fabrini-portfolio.firebaseio.com')

var authCallback = (err, authData, resolve, reject) => {
  if (err) return reject(err.message)
  window.localStorage.setItem('fbAuthToken', authData.token)
  resolve(authData)
}

var UserSource = {
  auth() {
    return {
      remote() {
        return new Promise((resolve, reject) => {
          let token = window.localStorage.getItem('fbAuthToken')
          if (!token) return reject(false)
          fbRef.authWithCustomToken(token, (err, authData) => {
            authCallback(err, authData, resolve, reject)
          })
        })
      },
      success: UserActions.updateUser,
      error: UserActions.userFailed,
      loading: UserActions.signIn
    }
  },
  signIn() {
    return {
      remote(store, credentials) {
        return new Promise((resolve, reject) => {
          if (!credentials.email && !credentials.password) {
            reject('E-mail and password can\'t be blank.')
            return
          }
          fbRef.authWithPassword(credentials, (err, authData) => {
            authCallback(err, authData, resolve, reject)
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