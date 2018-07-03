// Converts returned joi error object for form display compatibility
const joiToForms = require('joi-errors-for-forms').form
const convertToForms = joiToForms()

const convertErrorsForForms = (err) => {
  // Only use convertToForms if error is from Joi
  let errors = {}
  if (convertToForms(err)) {
    errors = convertToForms(err)
  } else {
    errors = err
  }
  return errors
}

export default convertErrorsForForms
