import AboutActions from '../actions/AboutActions'
import Firebase from 'firebase'
import { cloneDeep } from 'lodash'
const fbRef = new Firebase('https://aldo-fabrini-portfolio.firebaseio.com/about')

var AboutSource = {
  fetchData() {
    return {
      remote() {
        return new Promise((resolve, reject) => {
          fbRef.on('value', dataSnapshot => {
            let data = dataSnapshot.val()
            resolve(data)
          })
        })
      },
      success: AboutActions.updateData,
      error: AboutActions.dataFailed,
      loading: AboutActions.fetchData
    }
  },
  save() {
    return {
      remote(store, data) {
        return new Promise((resolve, reject) => {
          fbRef.update(data)
          resolve(data)
        })
      },
      success: AboutActions.updateData,
      error: AboutActions.dataFailed,
      loading: AboutActions.save
    }
  }
}

export default AboutSource