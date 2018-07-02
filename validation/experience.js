const Joi = require('joi')

module.exports = function validateExperienceInput(data) {
  const schema = {
    // need to .allow('') to accept empty optional input fields in forms
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string().allow(''),
    from: Joi.date().required(),
    to: Joi.date().allow(''),
    current: Joi.bool().allow(''),
    description: Joi.string().allow('')
  }
  return Joi.validate(data, schema, { abortEarly: false })
}
