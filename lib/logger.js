const winston = require('winston');
const moment = require('moment');

const logger = new winston.Logger({
  level: 'debug',
  transports: [
    new(winston.transports.Console)({
      timestamp() {
        return moment().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss.SSSS');
      },
      colorize: true,
      handleExceptions: true,
      json: false,
      prettyPrint: true,
      debugStdout: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
