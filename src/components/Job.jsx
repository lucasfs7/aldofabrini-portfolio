import React from 'react'
import JobThumb from '../components/JobThumb'
import JobDetails from '../components/JobDetails'
import Editor from 'medium-editor'
import { cloneDeep, merge, union, deburr, trim, kebabCase } from 'lodash'

const rmTags = /(<([^>]+)>)/ig

class Job extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [],
      thumb: {
        collapsed: false
      }
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
  
  handleRemoveImage(e) {
    e.preventDefault()
    e.stopPropagation()
    var t, img, container, url, images, imgIndex
    container = t = e.target
    while (container.nodeName.toLowerCase() !== 'li') container = t.parentNode
    img = container.getElementsByTagName('img')
    if (img.length) {
      url = img[0].src
      images = this.state.images
      imgIndex = images.indexOf(url)
      images.splice(imgIndex, 1)
      if (imgIndex !== -1) this.setState({images: images})
    }
  }

  setThumbSquare(e) {
    e.preventDefault()
    this.setState({thumb: {size: 'square'}})
  }

  setThumbRectangle(e) {
    e.preventDefault()
    this.setState({thumb: {size: 'rectangle'}})
  }

  collapseThumb(e) {
    e.preventDefault()
    this.setState({thumb: {collapsed: !this.state.thumb.collapsed}})
  }

  startEditing(props) {
    var singleElms, multElms, props = props || this.props
    props.setEditing(true)
    singleElms = document.querySelectorAll('.page-job-details .edit-single')
    multElms = document.querySelectorAll('.page-job-details .edit-mult')
    this.editor.singleLine = new Editor(singleElms, this.editor.singleLineOptions)
    this.editor.multLine = new Editor(multElms, this.editor.multLineOptions)
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
    var job, btns, addImage, thumbBtns, collapseThumbClassName, collapseThumbContainerClassName
    
    thumbBtns = <div className="hidden" />
    addImage = <div className="hidden" />
    btns = []
    
    if (this.props.jobsProps.loading) return (<p>Loading</p>)
    
    if (this.isNew()) job = this.schema
    else job = this.getJob(this.props)
    
    if (!job) return (<p className="msg error">Desculpe, mas não encontramos essa página.</p>)
    
    job = merge({}, this.schema, job)
    
    if (this.props.jobsProps.editing) {
      job.images = union(this.state.images, job.images)
      this.state.images = job.images
      if (this.state.thumb.size) job.thumb.size = this.state.thumb.size
      collapseThumbClassName = `fa fa-arrow-${(this.state.thumb.collapsed ? 'down' : 'up')}`
      thumbBtns = (
          <div className="btns-list">
            <li>
              <button className="btn">
                <i className="fa fa-picture-o" />
              </button>
            </li>
            <li>
              <button className="btn" onClick={this.setThumbSquare.bind(this)}>
                <i className="icon-square" />
              </button>
            </li>
            <li>
              <button className="btn" onClick={this.setThumbRectangle.bind(this)}>
                <i className="icon-rectangle" />
              </button>
            </li>
            <li>
              <button className="btn" onClick={this.collapseThumb.bind(this)}>
                <i className={collapseThumbClassName} />
              </button>
            </li>
          </div>
      )
    }
    
    collapseThumbContainerClassName = `edit-thumb${(this.state.thumb.collapsed ? ` collapsed-${job.thumb.size}` : '')}`

    if (this.props.userProps.user.uid) {
      if (this.props.jobsProps.editing) {
        addImage = <button className="btn btn-add-image" onClick={this.handleAddImage.bind(this)}><i className="fa fa-picture-o" /></button>
        btns.push(<button className="btn" onClick={this.handleSave.bind(this)}><i className="fa fa-check" /></button>)
      } else {
        btns.push(<button className="btn" onClick={this.handleStartEditing.bind(this)}><i className="fa fa-pencil" /></button>)
      }
      if (!this.isNew()) {
        btns.push(<button className="btn" onClick={this.handleRemove.bind(this)}><i className="fa fa-trash" /></button>)
      }
    }
    btns.push(<button className="btn" onClick={this.handleClose.bind(this)}><i className="fa fa-times" /></button>)
  
    return (
      <div className="page page-job-details">
        <ul className="btns-list">
          {btns.map((btn, i) => <li key={i}>{btn}</li>)}
        </ul>
        <div className={collapseThumbContainerClassName}>
          <JobThumb job={job} />
          {thumbBtns}
        </div>
        <JobDetails job={job} editing={this.props.jobsProps.editing} handleRemoveImage={this.handleRemoveImage.bind(this)}>
          {addImage}
        </JobDetails>
      </div>
    )
  }

  slugfy(str) {
    return kebabCase(trim(deburr(str.toLowerCase().replace(rmTags, ' '))))
  }
}

export default Job