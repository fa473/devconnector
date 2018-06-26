const Validator = require('validator')

module.exports = function validateLoginInput (data) {
  let errors = {}

  // Add '' to coerce input into String which is necessary for Validator
  if (!Validator.isEmail(data.email + '')) {
    errors.email = 'Email is invalid'
  }

  if (!data.email) {
    errors.email = 'Email field is required'
  }

  if (!data.password) {
    errors.password = 'Password field is required'
  }

  return {
    errors: errors,
    isValid: (!Object.keys(errors).length)
  }
}
