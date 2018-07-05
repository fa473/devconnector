import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
  onDeleteClick = (id) => {
    this.props.deleteEducation(id)
  }
  render() {
    const education = this.props.education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="MM/YYYY">{edu.from}</Moment> -{' '}
          {edu.to === null ? 'Now' : <Moment format="MM/YYYY">{edu.to}</Moment>}
        </td>
        <td>
          <button
            onClick={(e) => this.onDeleteClick(edu._id, e)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field of Study</th>
              <th>Dates</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    )
  }
}
Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.array.isRequired
}

export default connect(
  null,
  { deleteEducation }
)(Education)
