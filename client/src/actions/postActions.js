import axios from 'axios'
import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING } from './types'
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
// Get post
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

// Set loading state
export const setpostLoading = () => {
  return {
    type: POST_LOADING
  }
}
