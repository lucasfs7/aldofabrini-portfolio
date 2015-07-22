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

  handleStartEditing(e) {
    e.preventDefault()
    this.startEditing()
  }

  handleClose(e) {
    e.preventDefault()
    window.location.hash = ''
  }

  handleSave(e) {
    e.preventDefault()
  }

  startEditing(props) {
    var props = props || this.props
    props.setEditing(true)
  }

  stopEditing(props) {
    var props = props || this.props
    props.setEditing(false)
  }

  componentWillMount() {
    this.verifyAccess(this.props)
  }

  componentDidMount() {
    if (this.isNew(this.props)) this.startEditing(this.props)
  }

  componentWillUpdate(nextProps, prevProps) {
    this.verifyAccess(nextProps)
    if (!this.isNew(prevProps) 
      && !this.isNew(nextProps)) return
    if (!this.isNew(nextProps) 
      && nextProps.jobsProps.editing) return this.stopEditing(nextProps)
    if (this.isNew(nextProps) 
      && !nextProps.jobsProps.editing) return this.startEditing(nextProps)
  }
  
  componentWillUnmount() {
    this.stopEditing()
  }

  render() {
    var job, schema, name, client, description, images, message, btns
    
    if (this.props.jobsProps.loading) {
      return (<p>Loading</p>)
    }
    
    message = ''
    btns = []
    job = this.getJob(this.props)
    schema = this.props.jobSchema()
  
    if (this.props.jobsProps.errorMessage) {
      message = <p className="msg error">{this.props.jobsProps.errorMessage}</p>
    }

    if (job.name && job.name.long) name = job.name.long
    else name = schema.name.long
    
    if (job.client && job.client.name) client = job.client.name
    else client = schema.client.name
    
    if (job.description) description = job.description
    else description = schema.description
    
    if (job.images && job.images.length) images = job.images
    else images = schema.images

    if (this.props.jobsProps.editing) {
      btns.push(<button type="button" onClick={this.handleSave.bind(this)}><i className="fa fa-check" /></button>)
    } else {
      btns.push(<button type="button" onClick={this.handleStartEditing.bind(this)}><i className="fa fa-pencil" /></button>)
    }
    btns.push(<button type="button" onClick={this.handleClose.bind(this)}>x</button>)
  
    return (
      <div>
        <ul className="page-header-links">
          {btns.map((btn, i) => <li key={i}>{btn}</li>)}
        </ul>
        <div className="job-details">
          {message}
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
      </div>
    )
  }
}

export default JobDetails