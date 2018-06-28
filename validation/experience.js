const Joi = require('joi')

module.exports = function validateExperienceInput (data) {
  const schema = {
    title: Joi.string().required(),
    company: Joi.string().required(),
    location: Joi.string(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.bool(),
    description: Joi.string()
  }
  return Joi.validate(data, schema, {abortEarly: false})
}
