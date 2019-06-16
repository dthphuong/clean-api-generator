/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
var jwt = require('../utils/JWT'),
    utils = require('../utils'),
    config = require('../config');

exports.decode = function (req, res) {
    return res.send(req.payload)
}

exports.oauth = function (req, res) {
    return res.send({
        exitcode: 1,
        data: jwt.encode({
            data: 'Your data is JSON Object or JSON Array',
            message: 'This is your data'
        }, config.server.exptime),
        message: 'Generate JWT successful'
    })
}