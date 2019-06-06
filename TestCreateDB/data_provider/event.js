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
                    Entity.EventEntity.find({}, function (err, result) {
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
            console.log('Event_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (eventId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.EventEntity.aggregate([{
                            $match: {
                                '_id': mongoose.Types.ObjectId(eventId)
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
            console.log('Event_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.EventEntity.create({
                'name': data.name,'description': data.description,'startAt': data.startAt,'endAt': data.endAt,'banner': data.banner,'address': data.address,'contactPerson':  mongoose.Types.ObjectId(data.contactPerson),'score': data.score
            }, cb)
        })
        .catch(err => {
            console.log('Event_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function (eventId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.EventEntity.deleteOne({
                _id: mongoose.Types.ObjectId(eventId)
            }, cb)
        })
        .catch(err => {
            console.log('Event_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let eventId = data.eventId;
                    Entity.EventEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(eventId)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                ((data.name =='' || data.name == undefined) ? result[0].name : data.name);((data.description =='' || data.description == undefined) ? result[0].description : data.description);((data.startAt =='' || data.startAt == undefined) ? result[0].startAt : data.startAt);((data.endAt =='' || data.endAt == undefined) ? result[0].endAt : data.endAt);((data.banner =='' || data.banner == undefined) ? result[0].banner : data.banner);((data.address =='' || data.address == undefined) ? result[0].address : data.address);((data.contactPerson =='' || data.contactPerson == undefined) ? result[0].contactPerson : mongoose.Types.ObjectId (data.contactPerson));((data.score =='' || data.score == undefined) ? result[0].score : data.score)
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.EventEntity.updateOne({
                        _id: data.eventId
                    }, {
                        $set: {
                            'name': data.name,'description': data.description,'startAt': data.startAt,'endAt': data.endAt,'banner': data.banner,'address': data.address,'contactPerson':  mongoose.Types.ObjectId(data.contactPerson),'score': data.score
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
            console.log('Event_dataprovider_update: ' + err);
            cb(err, null)
        })
}