import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {details} = props
  const {logoUrl, id, name} = details

  return (
    <Link to={`/courses/${id}`} className="list-course-container">
      <li>
        <img src={logoUrl} alt={name} className="course-image" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}
export default CourseItem
