const Joi = require('joi')

module.exports = function validateEducationInput(data) {
  const schema = {
    // need to .allow('') to accept empty optional input fields in forms
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldofstudy: Joi.string().required(),
    location: Joi.string().allow(''),
    from: Joi.date().required(),
    to: Joi.date().allow(''),
    current: Joi.bool().allow(''),
    description: Joi.string().allow('')
  }
  return Joi.validate(data, schema, { abortEarly: false })
}
