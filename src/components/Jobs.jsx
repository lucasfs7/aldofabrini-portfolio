import React from 'react'
import JobThumb from '../components/JobThumb'

class Jobs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imagesLoaded: 0
    }
  }

  handleImage() {
    this.setState({imagesLoaded: this.state.imagesLoaded + 1})
  }

  verifyImagesLoaded() {
    return this.state.imagesLoaded >= this.props.jobsProps.jobs.length
  }

  componentDidUpdate() {
    if (this.verifyImagesLoaded()) {
      let elems = document.querySelectorAll('.job-thumb')
      if (elems.length) {
        for (let i = 0; i <= elems.length; i++) {
          setTimeout((function(elem) {
            return () => elem.classList.add('loaded')
          }(elems[i])), 100 * i)
        }
      }
    }
  }

  render() {
    var jobsProps = this.props.jobsProps
    var msg = (<div className="hidden" />)
  
    if (jobsProps.errorMessage) {
      return (<p className="msg error">{jobsProps.errorMessage}</p>)
    }

    if (jobsProps.loading) {
      return (<p className="msg">loading</p>)
    }

    if (!this.verifyImagesLoaded()) {
      msg = (<p className="msg">loading</p>)
    }

    return (
      <div>
        {msg}
        <ul className="jobs-list">
          {jobsProps.jobs.map((job, i) => {
            return (
              <li key={i}>
                <a href={`#${job.slug}`}>
                  <JobThumb job={job} handleImageLoad={this.handleImage.bind(this)} />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Jobs
