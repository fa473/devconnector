const Joi = require('joi')

module.exports = function validateProfileInput (data) {
  const schema = {
    company: Joi.string(),
    website: Joi.string().uri(),
    location: Joi.string(),
    bio: Joi.string(),
    status: Joi.string().required(),
    githubusername: Joi.string(),
    handle: Joi.string().min(2).max(40).required(),
    skills: Joi.string().required(),
    youtube: Joi.string().uri(),
    twitter: Joi.string().uri(),
    facebook: Joi.string().uri(),
    linkedin: Joi.string().uri(),
    instagram: Joi.string().uri()
  }
  return Joi.validate(data, schema, {abortEarly: false})
}
