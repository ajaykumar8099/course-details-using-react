import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseDetailsCard from '../CourseDetailsCard'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class CourseDetails extends Component {
  state = {apiStatus: apiConstants.initial, eachCourseList: {}}

  componentDidMount() {
    this.getEachCourse()
  }

  getEachCourse = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedCourseData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        eachCourseList: updatedCourseData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  failureRetryBtn = () => {
    this.getEachCourse()
  }

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="fail-image"
      />
      <h1 className="fail-head">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="failure-btn"
        onClick={this.failureRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader" className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {eachCourseList} = this.state
    return (
      <>
        <CourseDetailsCard courseDetails={eachCourseList} />
      </>
    )
  }

  allDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.successView()
      case apiConstants.failure:
        return this.failureView()
      case apiConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.allDetailsView()}
      </div>
    )
  }
}
export default CourseDetails
