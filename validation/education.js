const Joi = require('joi')

module.exports = function validateEducationInput (data) {
  const schema = {
    school: Joi.string().required(),
    degree: Joi.string().required(),
    fieldofstudy: Joi.string().required(),
    location: Joi.string(),
    from: Joi.date().required(),
    to: Joi.date(),
    current: Joi.bool(),
    description: Joi.string()
  }
  return Joi.validate(data, schema, {abortEarly: false})
}
