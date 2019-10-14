var express = require('express'),
  router = express.Router(),
  expressJoi = require('../../lib/joiValidation'),
  userHanlder = require('./users'),
  validationSchema = require('./userSchema')

router.get('/', expressJoi.joiValidate(validationSchema.getUsers), userHanlder.queryUsers)
router.post('/', expressJoi.joiValidate(validationSchema.addUser), userHanlder.insertNewUser)

module.exports = router
