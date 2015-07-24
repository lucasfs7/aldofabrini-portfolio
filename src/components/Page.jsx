import React from 'react'
import About from '../components/About'
import Login from '../components/Login'
import Job from '../components/Job'

class Page extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: ''
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => this.setRoute())
    this.setRoute()
  }
  
  setRoute() {
      let route = window.location.hash.substr(1)
      this.setState({currentPage: route})
  }

  render() {
    var page, jobsList
    jobsList = document.querySelector('.jobs-list')

    if (this.state.currentPage) {
      let Child
      switch (this.state.currentPage) {
        case 'about': Child = About; break;
        case 'login': Child = Login; break;
        default:      Child = Job;
      }
      page = (<Child {...this.props} route={this.state.currentPage} />)
      if (jobsList) jobsList.classList.add('hidden')
    } else {
      page = (<div className="hidden"></div>)
      if (jobsList) jobsList.classList.remove('hidden')
    }
  
    return (
      <div className="page-container">{page}</div>
    )
  }
}

export default Page