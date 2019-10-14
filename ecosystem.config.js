const {
  development,
  production
} = require('./env')

module.exports = {
  apps: [{
    name: `UserManagementService`,
    script: 'index.js',
    env_development: development,
    env_production: production,
    instances: 1,
    exec_mode: "cluster",
  }]
}
