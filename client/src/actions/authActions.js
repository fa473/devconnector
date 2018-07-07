import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
// Converts returned joi error object for form display compatibility
import convertErrorsForForms from '../validation/convert-errors'

// Register User
export const registerUser = (userData, history) => async (dispatch) => {
  try {
    await axios.post('/api/users/register', userData)
    history.push('/login')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: convertErrorsForForms(err.response.data)
    })
  }
}

// Login - Get user token
export const loginUser = (userData) => async (dispatch) => {
  try {
    const result = await axios.post('/api/users/login', userData)
    // Save to localStorage
    const { token } = result.data
    // Set token to localStorage
    localStorage.setItem('jwtToken', token)
    // Set token to auth header
    setAuthToken(token)
    // Decode token to get user data
    const decoded = jwt_decode(token)
    // Set current user
    dispatch(setCurrentUser(decoded))
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: convertErrorsForForms(err.response.data)
    })
  }
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log out user
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
  // redirect to login
  window.location.href = '/login'
}
