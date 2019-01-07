'use-strict'
const AuthenticateService = require('./services/AuthonticateService')

module.exports = function (app) {
  app.post('/api/login',AuthenticateService.login)
}