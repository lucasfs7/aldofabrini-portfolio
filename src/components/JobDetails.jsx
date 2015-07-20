import React from 'react'

class JobDetails extends React.Component {
  render() {
    if (this.props.route === 'new') {
      if (!this.props.user.uid) {
        window.location.hash = ''
        return (<div className="hidden"></div>)
      }
    }
  
    return (
      <div>job details page</div>
    )
  }
}

export default JobDetails