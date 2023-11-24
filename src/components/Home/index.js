import {Component} from 'react'
import Loader from 'react-loader-spinner'

import CourseItem from '../CourseItem'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiConstants.initial, courseList: []}

  componentDidMount() {
    this.getCourse()
  }

  getCourse = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateCourse = data.courses.map(each => ({
        id: each.id,
        logoUrl: each.logo_url,
        name: each.name,
      }))
      this.setState({courseList: updateCourse, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  failureRetryBtn = () => {
    this.getCourse()
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
    const {courseList} = this.state
    return (
      <div className="success-cont">
        <h1 className="heading">Courses</h1>
        <ul className="un-list-cont">
          {courseList.map(each => (
            <CourseItem key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  allDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.failure:
        return this.failureView()
      case apiConstants.inProgress:
        return this.loadingView()
      case apiConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.allDetailsView()}
      </>
    )
  }
}
export default Home
