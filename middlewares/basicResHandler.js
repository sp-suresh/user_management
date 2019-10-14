var logger = require('../lib/logger')

function serverError(res, ex){
  const sc = 500
  logger.error(`${res.req.method} ${sc} - Exception for ${res.req.originalUrl}`, ex)
  res.status(sc).send({
    responseCode: sc,
    responseDesc: 'Server Error!',
    data: 'Sorry, somethingwent wrong!'
  })
}

function clientError(res, data){
  const sc = 400
  logger.warn(`${res.req.method} ${sc} - Client error for ${res.req.originalUrl}`, msg)
  res.status(sc).send({
    responseCode: sc,
    responseDesc: 'Client Error!',
    data
  })
}

function unauthorised(res, data){
  const sc = 401
  logger.warn(`${res.req.method} ${sc} - Unauthorised request ${res.req.originalUrl}`)
  res.status(sc).send({
    responseCode: sc,
    responseDesc: 'Unauthorized!',
    data
  })
}

function success(res, data){
  const sc = 200
  logger.verbose(`${res.req.method} ${sc} - Success ${res.req.originalUrl}`)
  res.status(sc).send({
    responseCode: sc,
    responseDesc: 'Success!',
    data
  })
}

module.exports = {
  serverError,
  clientError,
  unauthorised,
  success
}
