/**
 * Created by Phuong Duong on 07/02/2018
 */

 var UseCase = require('../core/use_case/idiom');

exports.getAll = function(req, res, next) {
    UseCase.getAll(function(err, result) {
        if (err) {
            return res.send({
                exitcode: 0,
                data: {},
                message: err
            })
        } 

        return res.send({
            exitcode: 1,
            data: result,
            message: ''
        })
    })
}

exports.getAllABC = function(req, res, next) {
    UseCase.getAllABC(function(err, result) {
        if (err) {
            return res.send({
                exitcode: 0,
                data: {},
                message: err
            })
        } 

        return res.send({
            exitcode: 1,
            data: result,
            message: ''
        })
    })
}

exports.getRandom = function(req, res, next) {
    UseCase.getRandom(function(err, result){
        if (err) {
            return res.send({
                exitcode: 0,
                data: {},
                message: err
            })
        } 

        return res.send({
            exitcode: 1,
            data: result[0],
            message: ''
        })
    })
}