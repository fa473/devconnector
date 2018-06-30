const Joi = require('joi')

module.exports = function validateRegisterInput(data) {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required(),
    password2: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .options({
        language: { any: { allowOnly: 'must match password' } }
      })
  }
  return Joi.validate(data, schema, { abortEarly: false })
}
