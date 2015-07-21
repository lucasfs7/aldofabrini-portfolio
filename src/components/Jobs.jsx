import React from 'react'

class Jobs extends React.Component {
  render() {
    var jobsProps = this.props.jobsProps
  
    if (jobsProps.errorMessage) {
      return (
        <p>{jobsProps.errorMessage}</p>
      );
    }

    if (jobsProps.loading) {
      return (
        <p>Loading</p>
      )
    }

    return (
      <ul>
        {jobsProps.jobs.map((job, i) => {
          return (
            <li key={i}>
              <a href={`#${job.slug}`}>{job.name}</a>
            </li>
          );
        })}
      </ul>
    )
  }
}

export default Jobs
