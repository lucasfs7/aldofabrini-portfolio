import React from 'react'
import Editor from 'medium-editor'
import { merge, deburr, trim, kebabCase } from 'lodash'

class JobDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
    this.editor = {
      options: {
        disableDoubleReturn: true,
        toolbar: {
          buttons: ['underline', 'italic', 'bold', 'strikethrough', 'removeFormat']
        }
      },
      singleLineOptions: { disableReturn: true },
      multLineOptions: {}
    }
    merge(this.editor.multLineOptions, this.editor.options)
    merge(this.editor.singleLineOptions, this.editor.options)
  }

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
    var job = null;
    if (!this.isNew()) job = props.getJob(props.route)
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
    var job = this.getJob(this.props) || this.props.jobSchema()
    job.name.long = React.findDOMNode(this.refs.jobTitle).innerHTML
    job.client.name = React.findDOMNode(this.refs.jobClient).innerHTML
    job.description = React.findDOMNode(this.refs.jobDescription).innerHTML
    job.slug = this.slugfy(job.name.long)
    if (this.isNew()) job.isNew = true
    this.props.saveJob(job)
    this.stopEditing()
    window.location.hash = job.slug
  }

  handleRemove(e) {
    e.preventDefault()
    var job = this.getJob(this.props)
    if (job && job.id) this.props.removeJob(job.id)
    window.location.hash = ''
  }

  handleAddImage(e) {
    e.preventDefault()
    Dropbox.choose({
      linkType: 'direct',
      multiselect: true,
      extensions: ['.jpg', '.png', '.gif', '.bmp'],
      success: (files) => {
        if (files.length) {
          let images = []
          files.forEach((file) => {
            images.push(file.link)
          })
          this.setState({images: images})
        }
      }
    })
  }

  startEditing(props) {
    var title, client, description
    var props = props || this.props
    props.setEditing(true)
    title = React.findDOMNode(this.refs.jobTitle)
    client = React.findDOMNode(this.refs.jobClient)
    description = React.findDOMNode(this.refs.jobDescription)
    this.editor.singleLine = new Editor([title, client], this.editor.singleLineOptions)
    this.editor.multLine = new Editor(description, this.editor.multLineOptions)
  }

  stopEditing(props) {
    var props = props || this.props
    if (this.editor.singleLine) {
      this.editor.singleLine.destroy()
      this.editor.singleLine = null
    }
    if (this.editor.multLine) {
      this.editor.multLine.destroy()
      this.editor.multLine = null
    }
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
    var job, schema, name, client, description, message, images, btns, addImage
    
    if (this.props.jobsProps.loading) {
      return (<p>Loading</p>)
    }
    
    message = <div className="hidden" />
    addImage = <div className="hidden" />
    images = []
    merge(images, this.state.images)
    btns = []
    job = this.getJob(this.props) || {}
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
    
    if (job.images && job.images.length) merge(images, job.images)

    if (this.props.userProps.user.uid) {
      if (this.props.jobsProps.editing) {
        addImage = <button type="button" onClick={this.handleAddImage.bind(this)}><i className="fa fa-picture-o" /></button>
        btns.push(<button type="button" onClick={this.handleSave.bind(this)}><i className="fa fa-check" /></button>)
      } else {
        btns.push(<button type="button" onClick={this.handleStartEditing.bind(this)}><i className="fa fa-pencil" /></button>)
      }
      if (!this.isNew()) {
        btns.push(<button type="button" onClick={this.handleRemove.bind(this)}><i className="fa fa-trash" /></button>)
      }
    }
    btns.push(<button type="button" onClick={this.handleClose.bind(this)}>x</button>)
  
    return (
      <div>
        <ul className="page-header-links">
          {btns.map((btn, i) => <li key={i}>{btn}</li>)}
        </ul>
        <div className="job-details">
          {message}
          <h1 className="job-title" ref="jobTitle">{name}</h1>
          <h2 className="job-client" ref="jobClient">{client}</h2>
          <div className="job-description" ref="jobDescription" dangerouslySetInnerHTML={{__html: description}} />
          {addImage}
          <ul className="job-images" ref="jobImages">
            {images.map((imgUrl, i) => {
              return (
                <li key={i}>
                  <img src={imgUrl} alt={`Image ${i}`} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  slugfy(str) {
    return kebabCase(trim(deburr(str.toLowerCase().replace(/(<([^>]+)>)/ig, ' '))))
  }
}

export default JobDetails