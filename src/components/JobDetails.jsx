import React from 'react'

class JobDetails extends React.Component {
  constructor(props) {
    super()
    if (!this.isNew(props)) {
      this.state = {}
    } else {
      this.state = {
        name: {
          short: 'Short title',
          long: 'Job title'
        },
        client: {
          short_name: 'Client',
          name: 'Client name'
        },
        description: 'Job descrption goes here',
        images: []
      }
    }
  }
  
  isNew(nextProps) {
    var props = nextProps || this.props
    if (props.route === 'new') return true
    else return false
  }

  accessAllowed(nextProps) {
    var props = nextProps || this.props
    if (this.isNew(props) && !props.user.uid) {
      return false
    }
    return true
  }
  
  componentWillUpdate(nextProps) {
    var props = nextProps || this.props
    if (!this.accessAllowed(props)) window.location.hash = ''
  }

  render() {
    return (
      <div className="job-details">
        <h1 className="job-title">{this.state.name.long}</h1>
        <h2 className="job-client">{this.state.client.name}</h2>
        <div className="job-description">
          <p>{this.state.description}</p>
        </div>
        <ul className="job-images">
          {this.state.images.map((imgUrl, i) => {
            <li key={i}>
              <img src={imgUrl} alt={`Image ${i}`} />
            </li>
          })}
        </ul>
      </div>
    )
  }
}

export default JobDetails