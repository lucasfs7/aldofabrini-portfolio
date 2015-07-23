import React from 'react'

class JobDetails extends React.Component {
  render() {
    var job, children
    job = this.props.job
    children = this.props.children

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
                <img src={imgUrl} alt={`Image ${i}`} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default JobDetails