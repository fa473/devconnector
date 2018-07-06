import axios from 'axios'
import { ADD_POST, GET_ERRORS } from './types'
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
