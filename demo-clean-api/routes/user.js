/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
var UseCase = require('../core/use_case/user'),
    utils = require('../utils'),
    config = require('../config'),
    jwt = require('../utils/JWT'),
    _ = require('underscore'),
    crypto = require('crypto-js'),
    fs = require('fs');


exports.getAll = function (req, res, next) {
    UseCase.getAll(function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: [],
                message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: result,
            message: 'Get all items successful'
        })
    })
}


exports.getById = function (req, res, next) {
    var _id = req.body._id
    UseCase.getById(_id, function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: {},
                message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: result,
            message: 'Get item successful'
        })
    })
}

exports.create = function (req, res, next) {
    var data = req.body;
    UseCase.create(data, function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: {},
                message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: {
                _id: result._id,
            },
            message: 'Create item successful',
        });
    })
}

exports.update = function (req, res, next) {
    var user = req.body;
    UseCase.update(user, function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: {},
                message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: {
                'nModified': result.nModified
            },
            message: 'Update item successful'
        });
    })
}

exports.delete = function (req, res, next) {
    var _id = req.body._id;
    UseCase.delete(_id, function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: {},
                message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: {},
            message: 'Delete item successful'
        });
    })
}