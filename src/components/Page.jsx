import React from 'react'
import About from '../components/About'
import Login from '../components/Login'
import JobDetails from '../components/JobDetails'

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
    if (this.state.currentPage) {
      let Child;
      switch (this.state.currentPage) {
        case 'about': Child = About; break;
        case 'login': Child = Login; break;
        default:      Child = JobDetails;
      }

      return (
        <div id="page">
          <Child route={this.state.route} />
        </div>
      )
    }
  
    return (<div className="hidden"></div>)
  }
}

export default Page