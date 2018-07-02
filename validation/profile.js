const Joi = require('joi')

module.exports = function validateProfileInput(data) {
  const schema = {
    // need to .allow('') to accept empty optional input fields in forms
    company: Joi.string().allow(''),
    website: Joi.string()
      .uri()
      .allow(''),
    location: Joi.string().allow(''),
    bio: Joi.string().allow(''),
    status: Joi.string().required(),
    githubusername: Joi.string().allow(''),
    handle: Joi.string()
      .min(2)
      .max(40)
      .required(),
    skills: Joi.string().required(),
    youtube: Joi.string()
      .uri()
      .allow(''),
    twitter: Joi.string()
      .uri()
      .allow(''),
    facebook: Joi.string()
      .uri()
      .allow(''),
    linkedin: Joi.string()
      .uri()
      .allow(''),
    instagram: Joi.string()
      .uri()
      .allow('')
  }
  return Joi.validate(data, schema, { abortEarly: false })
}
