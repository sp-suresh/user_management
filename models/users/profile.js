const mongoose = require('mongoose')

var profileSchema = mongoose.Schema({
  firstName: {type: String, required: true, index: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, index: true},
  mobileNum: {type: String, required: true, index: true},
  pwdHash: {type: String, required: true},
  pwdSalt: {type: String, required: true},
  dob: {type: Number, required: true},
  createdOn: {type: Number, required: true},
})

module.exports.profileSchema = mongoose.model('users', profileSchema, 'users')
