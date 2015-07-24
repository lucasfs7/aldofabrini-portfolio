import alt from '../alt'
import AboutActions from '../actions/AboutActions'
import AboutSource from '../sources/AboutSource'
import { merge } from 'lodash'

class AboutStore {
  constructor() {
    this.title = ''
    this.images = []
    this.description = ''
    this.errorMessage = null
    this.loading = false
    this.editing = false

    this.bindListeners({
      handleUpdateData: AboutActions.UPDATE_DATA,
      handleFetchData: AboutActions.FETCH_DATA,
      handleDataFailed: AboutActions.DATA_FAILED,
      handleSetEditing: AboutActions.SET_EDITING,
      handleSave: AboutActions.SAVE
    })

    this.exportAsync(AboutSource)
  }
  
  handleSave() {
    this.loading = true
  }
  
  handleSetEditing(val) {
    if (typeof(val) === 'boolean')
      this.editing = val
  }
  
  getSchema() {
    return ({
      title: '',
      description: '',
      images: []
    })
  }

  handleUpdateData(data) {
    this.loading = false
    this.errorMessage = null
    if (!data) data = {}
    data = merge({}, this.getSchema(), data)
    this.title = data.title
    this.images = data.images
    this.description = data.description
  }

  handleFetchData() {
    this.loading = true
  }

  handleDataFailed(errorMessage) {
    this.loading = false
    this.errorMessage = errorMessage
  }
}

export default alt.createStore(AboutStore, 'AboutStore')