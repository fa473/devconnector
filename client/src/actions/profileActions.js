import axios from 'axios'
import { logoutUser } from './authActions'
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from './types'

// Converts returned joi error object for form display compatibility
import convertErrorsForForms from '../validation/convert-errors'

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
    dispatch({
      type: GET_ERRORS,
      payload: convertErrorsForForms(err.response.data)
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

// Add experience
export const addExperience = (expData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile/experience', expData)
    history.push('/dashboard')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: convertErrorsForForms(err.response.data)
    })
  }
}

// Add education
export const addEducation = (eduData, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile/education', eduData)
    history.push('/dashboard')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: convertErrorsForForms(err.response.data)
    })
  }
}

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    console.log(err.response.data)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  try {
    if (window.confirm('Are you sure? This cannot be undone!')) {
      await axios.delete('/api/profile')
      dispatch(logoutUser())
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
}
