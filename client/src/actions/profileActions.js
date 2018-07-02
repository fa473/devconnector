import axios from 'axios'
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types'

// Converts returned joi error object for form display compatibility
const joiToForms = require('joi-errors-for-forms').form
const convertToForms = joiToForms()

// Get current profile
export const getCurrentProfile = () => async (dispatch) => {
  dispatch(setProfileLoading())
  try {
    const res = await axios.get('/api/profile')
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    })
  }
}

// Create Profile
export const createProfile = (profileData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile', profileData)
    history.push('/dashboard')
  } catch (err) {
    // Only use convertToForms if error is from Joi
    let errors = {}
    if (convertToForms(err.response.data)) {
      errors = convertToForms(err.response.data)
    } else {
      errors = err.response.data
    }
    console.log(errors)
    dispatch({
      type: GET_ERRORS,
      payload: errors
    })
  }
}

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
