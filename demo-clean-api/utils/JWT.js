/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const config = require("../config");
var jwt = require("jsonwebtoken");

exports.encodeAccessToken = (payload) => {
  var jwtDecoded = jwt.sign(payload, config.server.accessTokenSecretKey, {
    expiresIn: parseInt(config.server.accessTokenExpiryTime)
  });
  jwtDecoded = jwtDecoded.split('.');
  var jwtDecodedString = jwtDecoded[2] + '.' + jwtDecoded[1].split('').reverse().join('') + '.' + jwtDecoded[0]

  return jwtDecodedString;
}

exports.decodeAccessToken = (token) => {
  var ret = {
    "exitcode": 0,
    "data": null,
    "message": ''
  };

  try {
    ret.exitcode = 1;

    var tokenParts = token.split('.')
    var tokenString = tokenParts[2] + '.' + tokenParts[1].split('').reverse().join('') + '.' + tokenParts[0];

    ret.data = jwt.verify(tokenString, config.server.accessTokenSecretKey);
    ret.message = 'Successful'
  } catch (err) {
    ret.error = err.message;

    switch (err.name) {
      case 'TokenExpiredError':
        ret.exitcode = 901;
        break;
      case 'JsonWebTokenError':
        ret.exitcode = 903;
        break;
      case 'NotBeforeError':
        ret.exitcode = 904;
        break;
      default:
        ret.exitcode = 0;
        break;
    }
  }

  return ret;
}

exports.encodeRefreshToken = (payload) => {
  var jwtDecoded = jwt.sign(payload, config.server.refreshTokenSecretKey, {
    expiresIn: parseInt(config.server.refreshTokenExpiryTime)
  });
  jwtDecoded = jwtDecoded.split('.');
  var jwtDecodedString = jwtDecoded[2] + '.' + jwtDecoded[1].split('').reverse().join('') + '.' + jwtDecoded[0]

  return jwtDecodedString;
}

exports.decodeRefreshToken = (token) => {
  var ret = {
    "exitcode": 0,
    "data": null,
    "message": ''
  };

  try {
    ret.exitcode = 1;

    var tokenParts = token.split('.')
    var tokenString = tokenParts[2] + '.' + tokenParts[1].split('').reverse().join('') + '.' + tokenParts[0];

    ret.data = jwt.verify(tokenString, config.server.refreshTokenSecretKey);
    ret.message = 'Successful'
  } catch (err) {
    ret.error = err.message;

    switch (err.name) {
      case 'TokenExpiredError':
        ret.exitcode = 901;
        break;
      case 'JsonWebTokenError':
        ret.exitcode = 903;
        break;
      case 'NotBeforeError':
        ret.exitcode = 904;
        break;
      default:
        ret.exitcode = 0;
        break;
    }
  }

  return ret;
}