const express = require('express')
const app = express()
const router = express.Router();
const bodyParser = require('body-parser')
const logger = require('./lib/logger')
const mongoose = require('mongoose')
const systemCheck = require('./systemCheck')
const keys = require('./keys')
const {verifyToken} = require('./middlewares/authMiddlewares')

systemCheck()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, tkn')
  next()
})

app.use(bodyParser.json())

router.use('/users', verifyToken, require('./controllers/users'));

app.use('/api', router)

app.listen(process.env.PORT, async () => {
  try{
    logger.info(`running on ${process.env.PORT}`, {
      NODE_ENV: process.env.NODE_ENV
    })
    await mongoose.connect(keys.MONGODB_URI, {
      auth: {
        user: keys.MONGODB_USER,
        password: keys.MONGODB_PASSWORD
      },
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    logger.info('Database connected!')
  }
  catch(e){
    logger.error('Error in startup code', e)
    process.exit()
  }
})

module.exports = app;
