/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const jwt = require('jsonwebtoken')

exports.encodeAccessToken = (payload) => {
  let jwtDecoded = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRED_TIME),
  })
  jwtDecoded = jwtDecoded.split('.')

  return jwtDecoded[2] + '.' + jwtDecoded[1].split('').reverse().join('') + '.' + jwtDecoded[0]
}

exports.decodeAccessToken = (token) => {
  let ret = {
    exitcode: 0,
    data: null,
    message: '',
  }

  try {
    ret.exitcode = 1

    const tokenParts = token.split('.')
    const tokenString = tokenParts[2] + '.' + tokenParts[1].split('').reverse().join('') + '.' + tokenParts[0]

    ret.data = jwt.verify(tokenString, process.env.ACCESS_TOKEN_SECRET_KEY)
    ret.message = 'Successful'
  } catch (err) {
    ret.error = err.message

    switch (err.name) {
      case 'TokenExpiredError':
        ret.exitcode = 901
        break
      case 'JsonWebTokenError':
        ret.exitcode = 903
        break
      case 'NotBeforeError':
        ret.exitcode = 904
        break
      default:
        ret.exitcode = 0
        break
    }
  }

  return ret
}

exports.encodeRefreshToken = (payload) => {
  let jwtDecoded = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRED_TIME),
  })
  jwtDecoded = jwtDecoded.split('.')

  return jwtDecoded[2] + '.' + jwtDecoded[1].split('').reverse().join('') + '.' + jwtDecoded[0]
}

exports.decodeRefreshToken = (token) => {
  let ret = {
    exitcode: 0,
    data: null,
    message: '',
  }

  try {
    ret.exitcode = 1

    const tokenParts = token.split('.')
    const tokenString = tokenParts[2] + '.' + tokenParts[1].split('').reverse().join('') + '.' + tokenParts[0]

    ret.data = jwt.verify(tokenString, process.env.REFRESH_TOKEN_SECRET_KEY)
    ret.message = 'Successful'
  } catch (err) {
    ret.error = err.message

    switch (err.name) {
      case 'TokenExpiredError':
        ret.exitcode = 901
        break
      case 'JsonWebTokenError':
        ret.exitcode = 903
        break
      case 'NotBeforeError':
        ret.exitcode = 904
        break
      default:
        ret.exitcode = 0
        break
    }
  }

  return ret
}
