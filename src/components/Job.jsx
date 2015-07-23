import React from 'react'
import JobThumb from '../components/JobThumb'
import Editor from 'medium-editor'
import { cloneDeep, merge, union, deburr, trim, kebabCase } from 'lodash'

const rmTags = /(<([^>]+)>)/ig

class Job extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
    this.editor = {
      options: {
        disableDoubleReturn: true,
        toolbar: false,
        placeholder: {
          text: 'Edit here...'
        }
      },
      singleLineOptions: { disableReturn: true },
      multLineOptions: {}
    }
    merge(this.editor.multLineOptions, this.editor.options)
    merge(this.editor.singleLineOptions, this.editor.options)
    this.schema = this.props.jobSchema()
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
    this.stopEditing(this.props)
    var job = this.getJob(this.props) || this.props.jobSchema()
    job.name.long = React.findDOMNode(this.refs.jobTitle).innerHTML.replace(rmTags, '')
    job.client.name = React.findDOMNode(this.refs.jobClient).innerHTML.replace(rmTags, '')
    job.description = React.findDOMNode(this.refs.jobDescription).innerHTML
    job.slug = this.slugfy(job.name.long)
    job.images = cloneDeep(this.state.images)
    this.state.images = []
    if (this.isNew()) job.isNew = true
    this.props.saveJob(job)
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
          let images = this.state.images
          files.forEach((file) => {
            images.splice(0, 0, file.link)
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

  componentWillUpdate(nextProps) {
    this.verifyAccess(nextProps)
    if (!this.isNew(this.props) 
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
    var job, images, btns, addImage, thumb
    
    thumb = <div className="hidden" />
    addImage = <div className="hidden" />
    btns = []
    
    if (this.props.jobsProps.loading) return (<p>Loading</p>)
    
    if (this.isNew()) job = this.schema
    else job = this.getJob(this.props)
    
    if (!job) return (<p className="msg error">Desculpe, mas não encontramos essa página.</p>)
    
    job = merge({}, this.schema, job)
    
    if (this.props.jobsProps.editing) {
      job.images = union(this.state.images, job.images)
      this.state.images = images
      thumb = (
        <div className="edit-thumb">
          <JobThumb job={job} />
          <div className="buttons">
            <button type="button"><i className="fa fa-picture-o" /></button>
            <button type="button"><i className="icon-square" /></button>
            <button type="button"><i className="icon-rectangle" /></button>
          </div>
        </div>
      )
    }

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
        {thumb}
        <div className="job-details">
          <h1 className="job-title" ref="jobTitle">{job.name.long}</h1>
          <h2 className="job-client" ref="jobClient">{job.client.name}</h2>
          <div className="job-description" ref="jobDescription" dangerouslySetInnerHTML={{__html: job.description}} />
          {addImage}
          <ul className="job-images" ref="jobImages">
            {job.images.map((imgUrl, i) => {
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

export default Job