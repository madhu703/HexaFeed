'use strict;'
const UsersModel = require('./../models/UsersModel')
const JWT = require('jsonwebtoken')
const config = require('config')

const AuthenticateService = module.exports
AuthenticateService.login =  (request, response)=> {
  let uiData = request.body

  if (!uiData.email || !uiData.password) {
    return response.send({ error: true, err_code: 'EMLPWDERR', message: 'Internal Server Error.Please try again.' })
  }
  let filter = {}
  filter.email = uiData.email

  UsersModel.findOne(filter,  (error, usersInfo)=> {
    if (error) {
      console.log('AUTHERR:', error)
      return response.send({ error: true, err_code: 'DBERR', message: 'Internal Server Error.Please try again.' })
    }
    if (!usersInfo) {
      return response.send({ error: true, err_code: 'NOPWDEMLERR', message: 'User Not found.' })
    }
    if (usersInfo.validPassword(uiData.password)) {
      console.log('Auth: Login successful of email' + uiData.email)
      return response.status(200).send({ error: false, data: { login_token: usersInfo.createJWT() } })
    }
    return response.send({ error: true, err_code: 'PWDMISMATCH', message: 'Invalid Email or Password' })
  })
  // return response.send({ error: null, data: 'Successfully applied login' })
}

AuthenticateService.signup =  (request, response)=> {
  let uiData = request.body
  if (!uiData.email || !uiData.password || !uiData.full_name || !uiData.mobile) {
    return response.send({ error: true, err_code: 'INPTNOFLDERR', message: 'Please provide All Details to signup.' })
  }
  let filter = {}
  filter.email = uiData.email

  UsersModel.findOne(filter, function (dbErr, usersInfo) {
    if (dbErr) {
      console.log('AUTHERR:', dbErr)
      return response.send({ error: true, err_code: 'DBERR', message: 'Internal Server Error.Please try again.' })
    }
    if (usersInfo && usersInfo.email) {
      return response.send({ error: true, err_code: 'DUPUSERERR', message: 'User Already existed with your email.' })
    }
    let userSignup = new UsersModel()
    userSignup.email = uiData.email
    userSignup.password = userSignup.generateHashPassword(uiData.password)
    userSignup.full_name = uiData.full_name
    userSignup.mobile = uiData.mobile
    userSignup.save(function (err, user) {
      if (err) {
        console.log('Auth: signup Error', err)
        return response.send({ error: true, err_code: 'DBERR', message: 'Internal Server Error .Please try again.' })
      }
      console.log('Auth: signup successful ' + uiData.email)
      return response.send({ error: false, data: { message: 'User Signup successful' } })
    })

    // .error((err) => {
    //   console.log('Auth: signup Error', err)
    //   return response.send({ error: true, err_code: 'DBERR', message: 'Internal Server Error .Please try again.' })
    // }))
  })
  // return response.send({ error: null, data: 'Successfully applied signup' })
}



AuthenticateService.userAuthenticate = (apiReq, apiRes, next_service) =>{
  var authentication_token = apiReq.headers['hxd-access-token']
  if (authentication_token) {
    JWT.verify(authentication_token, config.jwt_secret, function (token_verify_error, token_data) {
      if (token_verify_error){
        console.log(`TOKEN ERROR: ${token_verify_error}`)
        return apiRes.send({error:'User authentication failed.', error_code:'AUTHTOKENERR'})
      } else {
        console.log(`TOKEN DATA ${token_data} and current Date ${Date.now()}`)
        if(token_data.exp_time < Date.now()){
          return apiRes.send({'error':'User Authentication failed.Please login','error_code':'AUTHTOKENNOTFOUND'})
        }
        apiReq.user = token_data
        next_service()
      }
    })
  } else {
    return apiRes.send({'error':'User authentication failed.','error_code':'AUTHTOKENNOTFOUND'})
  }
}