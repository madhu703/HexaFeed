'use strict'
const AuthenticateService = require('./services/AuthonticateService')
const PostsService = require('./services/PostsService')
module.exports = function (app) {
  app.post('/api/login',AuthenticateService.login)
  app.post('/api/signup',AuthenticateService.signup)
  app.post('/api/add_new_post',AuthenticateService.userAuthenticate,PostsService.addNewPost)
  app.get('/api/get_all_posts',AuthenticateService.userAuthenticate,PostsService.getAllPosts)
  app.post('/api/comments_update',AuthenticateService.userAuthenticate,PostsService.updateComments)
}