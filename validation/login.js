const Joi = require('joi')

module.exports = function validateLoginInput(data) {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }
  return Joi.validate(data, schema, { abortEarly: false })
}
