var mongoose = require('mongoose')
const config = require('config')
var Schema = mongoose.Schema

var users = new Schema({
  user_id: {
    type: String,
    unique: true,
    required: true
  },
  post_message: {
    type: String
  },
  attachment: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  },
  comments: {
      type :Object
  },
  post_created_date: {
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
