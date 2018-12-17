/**
 * Created by Phuong Duong on 07/02/2018
 */

var UseCase = require('../core/use_case/account');

exports.checkUid = function(req, res, next) {
    var uid = req.body.username;

    UseCase.checkUid(uid, function(err, result) {
        if (err) {
            return res.send({
                exitcode: 0,
                data: {},
                message: err
            })
        } 
        return res.send(result)
    })
}

exports.oauth2 = function(req, res, next) {
    var uid = req.body.username.toLowerCase().trim()
        pwd = req.body.password
        userInfo;

    
}