import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

// Converts returned joi error object for form display compatibility
const joiToForms = require('joi-errors-for-forms').form
const convertToForms = joiToForms()

// Register User
export const registerUser = (userData, history) => async (dispatch) => {
  try {
    await axios.post('/api/users/register', userData)
    history.push('/login')
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: convertToForms(err.response.data)
    })
  }
}

// Login - Get user token
export const loginUser = (userData) => async (dispatch) => {
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
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
