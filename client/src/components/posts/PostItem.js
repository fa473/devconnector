import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, addLike, removeLike } from '../../actions/postActions'

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id)
  }
  onLikeClick(id) {
    this.props.addLike(id)
  }
  onUnlikeClick(id) {
    this.props.removeLike(id)
  }
  findUserLike(likes) {
    const auth = this.props.auth
    // check likes array to see if user has already liked post
    return likes.filter((like) => like.user === auth.user.id).length > 0
  }
  render() {
    const { post, auth, showActions } = this.props

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => this.onLikeClick(post._id)}
                >
                  <i
                    className={`${
                      this.findUserLike(post.likes)
                        ? 'text-info'
                        : 'text-secondary'
                    } fas fa-thumbs-up`}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={() => this.onUnlikeClick(post._id)}
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={() => this.onDeleteClick(post._id)}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem)
