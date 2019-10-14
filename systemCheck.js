const logger = require('./lib/logger');
const keys = require('./keys')

module.exports = function systemCheck() {
  if (!keys.NODE_ENV) {
    logger.warn('NODE_ENV variable not set');
    process.exit(1);
  }
  if (!keys.MONGODB_URI) {
    logger.error('MONGODB_URI variable not set');
    process.exit(1);
  }
  if (!keys.MONGODB_USER) {
    logger.error('MONGODB_USER variable not set');
    process.exit(1);
  }
  if (!keys.MONGODB_PASSWORD) {
    logger.error('MONGODB_PASSWORD variable not set');
    process.exit(1);
  }
}
