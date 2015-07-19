import React from 'react'

class Jobs extends React.Component {
  render() {
    if (this.props.errorMessage) {
      return (
        <p>{this.props.errorMessage}</p>
      );
    }

    if (this.props.loading) {
      return (
        <p>Loading</p>
      )
    }

    return (
      <ul>
        {this.props.jobs.map((job, i) => {
          return (
            <li key={i}>
              {job.name}
            </li>
          );
        })}
      </ul>
    )
  }
}

export default Jobs
