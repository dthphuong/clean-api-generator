var mongoose = require('mongoose')
var async = require('async'),
    _ = require('underscore'),
    util = require('../util');

var MongoConnect = require('../util/MongoConnect'),
    Entity = require('../core/entity');

exports.getAll = function (cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.ParticipantEntity.find({}, function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                callback(null, result)
                            } else {
                                callback(2, null)
                            }
                        }
                    })
                }
            ], cb)
        })
        .catch(err => {
            console.log('Participant_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (participantId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.ParticipantEntity.aggregate([{
                            $match: {
                                '_id': mongoose.Types.ObjectId(participantId)
                            }
                        }
                    ], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                callback(null, result[0])
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                }
            ], cb)
        })
        .catch(err => {
            console.log('Participant_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.ParticipantEntity.create({
                'code': data.code,'managerId':  mongoose.Types.ObjectId(data.managerId),'personalInfo': data.personalInfo,'avatar': data.avatar,'qrCode': data.qrCode,'score': data.score
            }, cb)
        })
        .catch(err => {
            console.log('Participant_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function (participantId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.ParticipantEntity.deleteOne({
                _id: mongoose.Types.ObjectId(participantId)
            }, cb)
        })
        .catch(err => {
            console.log('Participant_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let participantId = data.participantId;
                    Entity.ParticipantEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(participantId)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                ((data.code =='' || data.code == undefined) ? result[0].code : data.code);((data.managerId =='' || data.managerId == undefined) ? result[0].managerId : mongoose.Types.ObjectId (data.managerId));((data.personalInfo =='' || data.personalInfo == undefined) ? result[0].personalInfo : data.personalInfo);((data.avatar =='' || data.avatar == undefined) ? result[0].avatar : data.avatar);((data.qrCode =='' || data.qrCode == undefined) ? result[0].qrCode : data.qrCode);((data.score =='' || data.score == undefined) ? result[0].score : data.score)
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.ParticipantEntity.updateOne({
                        _id: data.participantId
                    }, {
                        $set: {
                            'code': data.code,'managerId':  mongoose.Types.ObjectId(data.managerId),'personalInfo': data.personalInfo,'avatar': data.avatar,'qrCode': data.qrCode,'score': data.score
                        }
                    }, function (err, data) {
                        if (!err) {
                            callback(null, data)
                        } else {
                            callback(err, null)
                        }
                    })
                }

            ], cb)
        })
        .catch(err => {
            console.log('Participant_dataprovider_update: ' + err);
            cb(err, null)
        })
}