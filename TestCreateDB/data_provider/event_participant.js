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
                    Entity.Event_participantEntity.find({}, function (err, result) {
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
            console.log('Event_participant_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (event_participantId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.Event_participantEntity.aggregate([{
                            $match: {
                                '_id': mongoose.Types.ObjectId(event_participantId)
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
            console.log('Event_participant_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.Event_participantEntity.create({
                'participantId':  mongoose.Types.ObjectId(data.participantId),'eventId':  mongoose.Types.ObjectId(data.eventId)
            }, cb)
        })
        .catch(err => {
            console.log('Event_participant_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function (event_participantId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.Event_participantEntity.deleteOne({
                _id: mongoose.Types.ObjectId(event_participantId)
            }, cb)
        })
        .catch(err => {
            console.log('Event_participant_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let event_participantId = data.event_participantId;
                    Entity.Event_participantEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(event_participantId)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                ((data.participantId =='' || data.participantId == undefined) ? result[0].participantId : mongoose.Types.ObjectId (data.participantId));((data.eventId =='' || data.eventId == undefined) ? result[0].eventId : mongoose.Types.ObjectId (data.eventId))
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.Event_participantEntity.updateOne({
                        _id: data.event_participantId
                    }, {
                        $set: {
                            'participantId':  mongoose.Types.ObjectId(data.participantId),'eventId':  mongoose.Types.ObjectId(data.eventId)
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
            console.log('Event_participant_dataprovider_update: ' + err);
            cb(err, null)
        })
}