const Joi = require('joi')

module.exports = function validatePostInput (data) {
  const schema = {
    text: Joi.string().min(10).max(300).required()
  }
  return Joi.validate(data, schema, {abortEarly: false})
}
