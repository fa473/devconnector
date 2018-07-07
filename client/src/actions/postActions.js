import axios from 'axios'
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST
} from './types'
import convertErrorsForForms from '../validation/convert-errors'

// Add post
export const addPost = (postData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/posts', postData)
    dispatch({
      type: ADD_POST,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: convertErrorsForForms(err.response.data)
    })
  }
}
// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    dispatch(setpostLoading())
    const res = await axios.get('/api/posts')
    dispatch({
      type: GET_POSTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_POSTS,
      payload: null
    })
  }
}

// Get post by id
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch(setpostLoading())
    const res = await axios.get(`/api/posts/${id}`)
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_POST,
      payload: null
    })
  }
}

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`)
    dispatch({
      type: DELETE_POST,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: convertErrorsForForms(err.response.data)
    })
  }
}

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    await axios.post(`/api/posts/like/${id}`)
    dispatch(getPosts())
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: convertErrorsForForms(err.response.data)
    })
  }
}

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    await axios.post(`/api/posts/unlike/${id}`)
    dispatch(getPosts())
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: convertErrorsForForms(err.response.data)
    })
  }
}

// Add comment
export const addComment = (id, commentData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/posts/comment/${id}`, commentData)
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: convertErrorsForForms(err.response.data)
    })
  }
}

// Set loading state
export const setpostLoading = () => {
  return {
    type: POST_LOADING
  }
}
