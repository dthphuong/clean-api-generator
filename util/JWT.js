/**
 * Created by Phuong Duong on 09/02/2018
 */
const config = require('../config');
var jwt = require('jsonwebtoken');

exports.encode = function(payload, exp) {
    // console.log(payload);
    // console.log(config.secret);
    return jwt.sign(payload, config.secret, { expiresIn: parseInt(exp) });
}

exports.decode = function(token) {
    var ret = {"status":0, "data":null, "error":null};

    try {
        ret.status = 1;
        ret.data = jwt.verify(token, config.secret);
    } catch(err) {
        ret.status = 0;
        ret.error = err.message;
    }

    return ret;
}