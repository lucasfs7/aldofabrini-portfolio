import React from 'react'

class Jobs extends React.Component {
  render() {
    if (this.props.jobs.length) {
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
    } else {
      return (
        <p>Nenhum job encontrado.</p>
      )
    }
  }
}

export default Jobs
