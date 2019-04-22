/**
 * Created by Phuong Duong on 05/09/2018
 */
const config = require("../config");
var jwt = require("jsonwebtoken");

function encode(payload, exp) {
  return jwt.sign(payload, config.server.secret, {
    expiresIn: parseInt(exp)
  });
}

function decode(token) {
  var ret = {
    "exitcode": 0,
    "data": null,
    "message": null
  };

  try {
    ret.exitcode = 1;
    ret.data = jwt.verify(token, config.server.secret);
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

exports.encode = encode;
exports.decode = decode;