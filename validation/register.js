const Validator = require('validator')

module.exports = function validateRegisterInput (data) {
  let errors = {}

  // Add '' to coerce input into String which is necessary for Validator
  if (!Validator.isLength(data.name + '', {min: 2, max: 30})) {
    errors.name = 'Name must be between 2 and 30 characters'
  }

  if (!data.name) {
    errors.name = 'Name field is required'
  }

  if (!data.email) {
    errors.email = 'Email field is required'
  }

  if (!Validator.isEmail(data.email + '')) {
    errors.email = 'Email is invalid'
  }

  if (!data.password) {
    errors.password = 'Password field is required'
  }
  if (!Validator.isLength(data.password + '', {min: 6, max: 30})) {
    errors.password = 'Password must be between 6 and 30 characters'
  }
  if (!data.password2) {
    errors.password2 = 'Confirm Password field is required'
  }
  if (!Validator.equals(data.password + '', data.password2)) {
    errors.password2 = 'Passwords do not match'
  }

  return {
    errors: errors,
    isValid: (!Object.keys(errors).length)
  }
}
