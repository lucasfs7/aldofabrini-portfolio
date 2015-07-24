import React from 'react'

class JobThumb extends React.Component {
  render() {
    var job, image
    job = this.props.job
    image = <div className="hidden" />

    if (job.thumb.image) {
      image = <img className="job-thumb-image" src={job.thumb.image} alt={job.name.long} ref="jobThumbImage" />
    }

    return(
      <figure className={`job-thumb ${job.thumb.size}`}>
        {image}
        <figcaption className="job-thumb-description">
          <span className="job-thumb-name edit-single" ref="jobShortName">{job.name.short}</span>
          <span className="job-thumb-client edit-single" ref="jobClientShortName">{job.client.short_name}</span>
        </figcaption>
      </figure>
    )
  }
}

export default JobThumb