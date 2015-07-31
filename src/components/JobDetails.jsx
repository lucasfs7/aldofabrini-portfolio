import React from 'react'

class JobDetails extends React.Component {
  handleVideoPlayback(e) {
    e.preventDefault()
    var t = e.target
    if (t.paused) {
      t.play()
      t.controls = true
    } else {
      t.pause()
      t.controls = false
    }
  }

  render() {
    var job, children, rmImageBtn
    job = this.props.job
    children = this.props.children
    if (this.props.editing) rmImageBtn = <button className="btn btn-remove-image" onClick={this.props.handleRemoveImage}><i className="fa fa-trash" /></button>

    var getFile = function(filename) {
      var isVideo = /\.[(avi|mp4|webm|ogv|ogg|mov)]+$/i
      var isImage = /\.[(jpg|png|gif|svg|bmp)]+$/i
      var file = filename.replace('?dl=1', '')
      if (isVideo.test(file)) {
        return (
          <video 
            src={filename} 
            poster="/img/video-poster.png" 
            onClick={this.handleVideoPlayback.bind(this)} 
          />
        )
      }
      if (isImage.test(file)) {
        return (
          <img src={filename} />
        )
      }
    }.bind(this)

    return (
      <div className="job-details">
        <h1 className="job-title edit-single" ref="jobTitle">{job.name.long}</h1>
        <h2 className="job-client edit-single" ref="jobClient">{job.client.name}</h2>
        <div className="job-description edit-mult" ref="jobDescription" dangerouslySetInnerHTML={{__html: job.description}} />
        {children}
        <ul className="job-images" ref="jobImages">
          {job.images.map((imgUrl, i) => {
            return (
              <li key={i}>
                {rmImageBtn}
                {getFile(imgUrl)}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default JobDetails
