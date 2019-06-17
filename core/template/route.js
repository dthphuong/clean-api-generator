/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
var UseCase = require('../core/use_case/___COLLECTION_NAME___'),
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
    var ___ID___ = req.body.___ID___
    UseCase.getById(___ID___, function (err, result) {
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
                data: [],
                message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: {
                ___ID___: result._id,
            },
            message: 'Create item successful',
        });
    })
}

exports.update = function (req, res, next) {
    var ___COLLECTION_NAME___ = req.body;
    UseCase.update(___COLLECTION_NAME___, function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: [],
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
    var ___ID___ = req.body.___ID___;
    UseCase.delete(___ID___, function (err, result) {
        if (err) {
            return res.send({
                exitcode: utils.ErrorHandle.getErrorCode(err),
                data: [],
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