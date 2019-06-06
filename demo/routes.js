var UseCase = require('../core/use_case/[[DBNAME]]'),
    util = require('../util'),
    config = require('../config'),
    jwt = require('../util/JWT'),
    _ = require('underscore'),
    crypto = require('crypto-js'),
    fs = require('fs');


exports.getAll = function (req, res, next) {
    UseCase.getAll(function (err, result) {
        if (err) {
            return res.send({
                exitcode: util.ErrorHandle.getErrorCode(err),
                data: [],
                message: util.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: result,
            message: 'Successful'
        })
    })
}


exports.getById = function (req, res, next) {
    var [[NAMEID1]] = req.body.[[NAMEID2]]
    UseCase.getById([[NAMEID3]], function (err, result) {
        if (err) {
            return res.send({
                exitcode: util.ErrorHandle.getErrorCode(err),
                data: {},
                message: util.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: result,
            message: 'Successful'
        })
    })
}

exports.create = function (req, res, next) {
    var data = req.body;
    UseCase.create(data, function (err, result) {
        if (err) {
            return res.send({
                exitcode: util.ErrorHandle.getErrorCode(err),
                data: [],
                message: util.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: {
                [[NAMEID4]]: result._id,
            },
            message: 'Create successful',
        });
    })
}

exports.delete = function (req, res, next) {
    var [[NAMEID5]] = req.body.[[NAMEID6]];
    UseCase.delete([[NAMEID7]], function (err, result) {
        if (err) {
            return res.send({
                exitcode: util.ErrorHandle.getErrorCode(err),
                data: [],
                message: util.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: {},
            message: 'Delete successful '
        });
    })
}

exports.update = function (req, res, next) {
    var [[DBNAME1]] = req.body;
    UseCase.update([[DBNAME2]], function (err, result) {
        if (err) {
            return res.send({
                exitcode: util.ErrorHandle.getErrorCode(err),
                data: [],
                message: util.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
        }
        return res.send({
            exitcode: 1,
            data: {
                'nModified': result.nModified
            },
            message: 'Update successful'
        });
    })
}