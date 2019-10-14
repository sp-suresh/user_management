const expressJoi = require('../../lib/joiValidation')

exports.addUser = {
  firstName: expressJoi.Joi.string().max(200).min(2).required(),
  lastName: expressJoi.Joi.string().max(200).min(2).required(),
  email: expressJoi.Joi.string().email().min(3).max(200).required(),
  mobileNum: expressJoi.Joi.string().length(10).required(),
  dob: expressJoi.Joi.number().required(),
  password: expressJoi.Joi.string().min(6).max(100).required()
}

exports.getUsers = {
  offset: expressJoi.Joi.number().integer().min(0).default(0),
  limit: expressJoi.Joi.number().integer().min(1).default(20).max(20),
}
