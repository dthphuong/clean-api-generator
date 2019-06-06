var UseCase = require('../core/use_case/event_participant'),
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
    var event_participantId = req.body.event_participantId
    UseCase.getById(event_participantId, function (err, result) {
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
                event_participantId: result._id,
            },
            message: 'Create successful',
        });
    })
}

exports.delete = function (req, res, next) {
    var event_participantId = req.body.event_participantId;
    UseCase.delete(event_participantId, function (err, result) {
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
    var event_participant = req.body;
    UseCase.update(event_participant, function (err, result) {
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