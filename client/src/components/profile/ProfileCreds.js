import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

class ProfileCreds extends Component {
  render() {
    const { profile } = this.props
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {profile.experience.map((exp, index) => (
              <li key={index} className="list-group-item">
                <h4>{profile.experience[index].company}</h4>
                <p>
                  <Moment format="MM/YYYY">
                    {profile.experience[index].from}
                  </Moment>{' '}
                  -{' '}
                  {profile.experience[index].to ? (
                    <Moment format="MM/YYYY">
                      {profile.experience[index].to}
                    </Moment>
                  ) : (
                    'Now'
                  )}
                </p>
                <p>
                  <strong>Position: </strong>
                  {profile.experience[index].title}
                </p>
                <p>
                  <strong>Description: </strong>{' '}
                  {profile.experience[index].description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            {profile.education.map((exp, index) => (
              <li key={index} className="list-group-item">
                <h4>{profile.education[index].school}</h4>
                <p>
                  <Moment format="MM/YYYY">
                    {profile.education[index].from}
                  </Moment>{' '}
                  -{' '}
                  {profile.education[index].to ? (
                    <Moment format="MM/YYYY">
                      {profile.education[index].to}
                    </Moment>
                  ) : (
                    'Now'
                  )}
                </p>
                <p>
                  <strong>Degree: {profile.education[index].degree}</strong>
                </p>
                <p>
                  <strong>
                    Field of Study: {profile.education[index].fieldofstudy}
                  </strong>
                </p>
                <p>
                  <strong>
                    Description: {profile.education[index].description}
                  </strong>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

ProfileCreds.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileCreds
