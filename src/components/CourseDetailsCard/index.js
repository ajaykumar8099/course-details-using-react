import './index.css'

const CourseDetailsCard = props => {
  const {courseDetails} = props
  const {imageUrl, description, name} = courseDetails
  return (
    <div className="main-card">
      <div className="course-card">
        <img src={imageUrl} alt={name} className="full-img" />
        <div className="sub-card">
          <h1 className="card-head">{name}</h1>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard
