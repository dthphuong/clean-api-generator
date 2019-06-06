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
                    Entity.AttendanceEntity.find({}, function (err, result) {
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
            console.log('Attendance_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (attendanceId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.AttendanceEntity.aggregate([{
                            $match: {
                                '_id': mongoose.Types.ObjectId(attendanceId)
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
            console.log('Attendance_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.AttendanceEntity.create({
                'participantId':  mongoose.Types.ObjectId(data.participantId),'eventId':  mongoose.Types.ObjectId(data.eventId),'timestamp': data.timestamp
            }, cb)
        })
        .catch(err => {
            console.log('Attendance_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function (attendanceId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.AttendanceEntity.deleteOne({
                _id: mongoose.Types.ObjectId(attendanceId)
            }, cb)
        })
        .catch(err => {
            console.log('Attendance_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let attendanceId = data.attendanceId;
                    Entity.AttendanceEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(attendanceId)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                ((data.participantId =='' || data.participantId == undefined) ? result[0].participantId : mongoose.Types.ObjectId (data.participantId));((data.eventId =='' || data.eventId == undefined) ? result[0].eventId : mongoose.Types.ObjectId (data.eventId));((data.timestamp =='' || data.timestamp == undefined) ? result[0].timestamp : data.timestamp)
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.AttendanceEntity.updateOne({
                        _id: data.attendanceId
                    }, {
                        $set: {
                            'participantId':  mongoose.Types.ObjectId(data.participantId),'eventId':  mongoose.Types.ObjectId(data.eventId),'timestamp': data.timestamp
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
            console.log('Attendance_dataprovider_update: ' + err);
            cb(err, null)
        })
}