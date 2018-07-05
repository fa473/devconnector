import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileAbout from './ProfileAbout'
import ProfileCreds from './ProfileCreds'
import ProfileGithub from './ProfileGithub'
import ProfileHeader from './ProfileHeader'
import Spinner from '../common/Spinner'
import { getProfileByHandle } from '../../actions/profileActions'

export class Profile extends Component {
  componentDidMount = () => {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }

  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
})

Profile.propTypes = {
  // profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile)
