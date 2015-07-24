import alt from '../alt'

class AboutActions {
  updateData(data) {
    this.dispatch(data)
  }

  fetchData() {
    this.dispatch()
  }

  dataFailed(errorMessage) {
    this.dispatch(errorMessage)
  }
  
  setEditing(val) {
    this.dispatch(val)
  }
  
  save(data) {
    this.dispatch()
  }
}

export default alt.createActions(AboutActions)