const {serverError, success} = require('../../middlewares/basicResHandler')
const {profileSchema} = require('../../models/users/profile')
const bcrypt = require('bcrypt')
const logger = require('../../lib/logger')

async function queryUsers(req, res) {
  try {
    const maxLimit = 20
    var offset = parseInt(req.query.offset) || 0
    var limit = parseInt(req.query.limit)  || maxLimit
    
    var userList = await profileSchema.find({}, {_id: 0,
      firstName: 1,
      lastName: 1,
      email: 1,
      mobileNum: 1,
      dob: 1,
      createdOn: 1
    }).sort({createdOn: -1}).skip(offset).limit(limit);

    var totalUser = await profileSchema.find({}).estimatedDocumentCount()

    success(res, {userList, total: totalUser})
  } catch (e) {
    serverError(res, e)
  }
}

async function insertNewUser(req, res){
  try{
    var salt = await bcrypt.genSalt(10)
    var body = req.body
    var hashedPwd = await bcrypt.hash(body.password, salt)

    delete body.password

    body.pwdSalt = salt
    body.pwdHash = hashedPwd
    body.createdOn = Date.now()

    await new profileSchema(body).save()
    
    success(res, 'Inserted successfully!')
  }
  catch(e){
    serverError(res, e)
  }
}

module.exports = {
  queryUsers,
  insertNewUser
}
