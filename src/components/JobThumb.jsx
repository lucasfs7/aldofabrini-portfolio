import React from 'react'

class JobThumb extends React.Component {
  render() {
    var job, image
    job = this.props.job
    image = <div className="hidden" />

    if (job.thumb.image) {
      image = <img className="job-thumb-image" src={job.thumb.image} alt={job.name.long} ref="jobThumbImage" onLoad={this.props.handleImageLoad} />
    }

    return(
      <figure className={`job-thumb ${job.thumb.size}`}>
        {image}
        <figcaption className="job-thumb-description">
          <div className="align-table">
            <div className="align-table-cell">
              <span className="job-thumb-name edit-single" ref="jobShortName">{job.name.short}</span>
              <span className="job-thumb-client edit-single" ref="jobClientShortName">{job.client.short_name}</span>
            </div>
          </div>
        </figcaption>
      </figure>
    )
  }
}

export default JobThumb
