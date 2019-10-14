var jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
var {
  unauthorised
} = require('./basicResHandler')
const logger = require('../lib/logger')

async function verifyToken(req, res, next) {

  var token = req.headers.tkn || ""
  if (!token.length) {
    return unauthorised(res, 'Token absent')
  }
  try {
    req.tkn = await jwt.verify(token, JWT_SECRET).id
    next()
  }
  catch(e){
    logger.warn('In token verify', e.message)
    return unauthorised(res, e.message)
  }
}

module.exports.verifyToken = verifyToken
