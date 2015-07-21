import React from 'react'

class JobDetails extends React.Component {
  isNew(nextProps) {
    var props = nextProps || this.props
    if (props.route === 'new') return true
    else return false
  }

  accessAllowed(nextProps) {
    var props = nextProps || this.props
    if (this.isNew(props) && !props.userProps.user.uid) {
      return false
    }
    return true
  }
  
  verifyAccess(props) {
    if (!this.accessAllowed(props)) window.location.hash = ''
  }
  
  getJob(props) {
    var job;
    if (!this.isNew()) job = props.getJob(props.route)
    if (!job) return {}
    return job
  }
  
  componentDidMount() {
    this.verifyAccess(this.props)
  }
  
  componentWillUpdate(nextProps) {
    var props = nextProps || this.props
    this.verifyAccess(props)
  }

  render() {
    var job, schema, name, client, description, images
    
    if (this.props.jobsProps.loading) {
      return (<p>Loading</p>)
    }
    
    if (this.props.jobsProps.errorMessage) {
      return (<p className="msg error">{this.props.jobsProps.errorMessage}</p>)
    }

    job = this.getJob(this.props)
    schema = this.props.jobSchema()
  
    if (job.name && job.name.long) name = job.name.long
    else name = schema.name.long
    
    if (job.client && job.client.name) client = job.client.name
    else client = schema.client.name
    
    if (job.description) description = job.description
    else description = schema.description
    
    if (job.images && job.images.length) images = job.images
    else images = schema.images
  
    return (
      <div className="job-details">
        <h1 className="job-title">{name}</h1>
        <h2 className="job-client">{client}</h2>
        <div className="job-description" dangerouslySetInnerHTML={{__html: description}} />
        <ul className="job-images">
          {images.map((imgUrl, i) => {
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