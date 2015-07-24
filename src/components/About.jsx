import React from 'react'
import Editor from 'medium-editor'
import { merge, union, cloneDeep } from 'lodash'

const rmTags = /(<([^>]+)>)/ig

class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    }
    this.editor = {
      options: {
        disableDoubleReturn: true,
        toolbar: {
          buttons: ['anchor']
        },
        placeholder: {
          text: 'Edit here...'
        }
      },
      singleLineOptions: { disableReturn: true },
      multLineOptions: {}
    }
    merge(this.editor.multLineOptions, this.editor.options)
    merge(this.editor.singleLineOptions, this.editor.options)
  }

  handleClose(e) {
    e.preventDefault()
    window.location.hash = ''
  }

  handleStartEditing(e) {
    e.preventDefault()
    this.startEditing()
  }

  handleAddImage(e) {
    e.preventDefault()
    Dropbox.choose({
      linkType: 'preview',
      multiselect: true,
      extensions: ['.jpg', '.png', '.gif', '.bmp'],
      success: (files) => {
        if (files.length) {
          let images = this.state.images
          files.forEach((file) => {
            images.splice(0, 0, file.link.replace('dl=0', 'dl=1'))
          })
          this.setState({images: images})
        }
      }
    })
  }
  
  handleRemoveImage(e) {
    e.preventDefault()
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
  
  handleSave(e) {
    e.preventDefault()
    var about = {}
    about.images = cloneDeep(this.state.images)
    about.title = document.querySelector('.page-about .about-title').innerHTML.replace(rmTags, '')
    about.description = document.querySelector('.page-about .about-description').innerHTML
    this.state.images = []
    this.props.saveAbout(about)
    this.stopEditing()
  }

  startEditing() {
    var singleElms, multElms
    this.props.setEditingAbout(true)
    singleElms = document.querySelectorAll('.page-about .edit-single')
    multElms = document.querySelectorAll('.page-about .edit-mult')
    this.editor.singleLine = new Editor(singleElms, this.editor.singleLineOptions)
    this.editor.multLine = new Editor(multElms, this.editor.multLineOptions)
  }

  stopEditing() {
    if (this.editor.singleLine) {
      this.editor.singleLine.destroy()
      this.editor.singleLine = null
    }
    if (this.editor.multLine) {
      this.editor.multLine.destroy()
      this.editor.multLine = null
    }
    this.props.setEditingAbout(false)
  }

  componentWillUnmount() {
    this.stopEditing()
  }

  render() {
    var about, rmImageBtn, addImageBtn, btns
    about = this.props.about
    rmImageBtn = (<div className="hidden" />)
    addImageBtn = (<div className="hidden" />)
    btns = []

    if (about.editing) {
      about.images = union(this.state.images, about.images)
      this.state.images = about.images
      rmImageBtn = (
        <button className="btn btn-remove-image" onClick={this.handleRemoveImage.bind(this)}>
          <i className="fa fa-trash" />
        </button>
      )
      addImageBtn = (
        <button className="btn btn-add-image" onClick={this.handleAddImage.bind(this)}>
          <i className="fa fa-picture-o" />
        </button>
      )
    }

    if (this.props.userProps.user.uid) {
      if (about.editing) {
        btns.push(
          <button className="btn" onClick={this.handleSave.bind(this)}>
            <i className="fa fa-check" />
          </button>
        )
      } else {
        btns.push(
          <button className="btn" onClick={this.handleStartEditing.bind(this)}>
            <i className="fa fa-pencil" />
          </button>
        )
      }
    }
    btns.push(
      <button className="btn" onClick={this.handleClose.bind(this)}>
        <i className="fa fa-times" />
      </button>
    )

    return (
      <div className="page page-about">
        <ul className="btns-list">
          {btns.map((btn, i) => <li key={i}>{btn}</li>)}
        </ul>
        <h1 className="about-title edit-single">{about.title}</h1>
        {addImageBtn}
        <ul className="about-images">
          {about.images.map((imgUrl, i) => {
            return (
              <li key={i}>
                {rmImageBtn}
                <img src={imgUrl} alt={`Image ${i}`} />
              </li>
            )
          })}
        </ul>
        <div className="about-description edit-mult" 
          dangerouslySetInnerHTML={{__html: about.description}} />
      </div>
    )
  }
}

export default About