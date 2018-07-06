const Joi = require('joi')

module.exports = function validatePostInput(data) {
  const schema = {
    text: Joi.string()
      .min(10)
      .max(300)
      .required(),
    name: Joi.string().optional(),
    avatar: Joi.string().optional()
  }
  return Joi.validate(data, schema, { abortEarly: false })
}
