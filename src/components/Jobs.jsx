import React from 'react'
import JobThumb from '../components/JobThumb'

class Jobs extends React.Component {
  render() {
    var jobsProps = this.props.jobsProps
  
    if (jobsProps.errorMessage) {
      return (<p className="msg error">{jobsProps.errorMessage}</p>)
    }

    if (jobsProps.loading) {
      return (
        <p>loading</p>
      )
    }

    return (
      <ul>
        {jobsProps.jobs.map((job, i) => {
          return (
            <li key={i}>
              <a href={`#${job.slug}`}>
                <JobThumb job={job} />
              </a>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Jobs