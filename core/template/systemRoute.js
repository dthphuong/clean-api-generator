/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
var jwt = require('../utils/JWT'),
    utils = require('../utils');

exports.decode = function (req, res) {
    return res.send(req.payload)
}