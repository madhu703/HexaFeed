var mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const config = require('config')
var Schema = mongoose.Schema

var bcrypt = require('bcrypt-nodejs')
var users = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  company: {
    type: String
  },
  mobile: {
    type: String
  },
  region: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  },

  created_date: {
    type: Number,
    default: Date.now
  }
}, {
    versionKey: false
  })

users.methods.generateHashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

users.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

users.methods.createJWT = function () {
  let exptime = parseInt(Date.now + (7 * 24 * 60 * 60 * 1000))
  let resTokenInfo = {}
  resTokenInfo.id = this._id
  resTokenInfo.name = (this.first_name) + ' ' + this.last_name
  resTokenInfo.eamil = this.email
  resTokenInfo.exp_time = exptime
  return JWT.sign(resTokenInfo, config.jwt_secret)
}


module.exports = mongoose.model('users', users)
