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
                    Entity.HallEntity.find({}, function (err, result) {
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
            console.log('Hall_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (hallId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.HallEntity.aggregate([{
                        $match: {
                            '_id': mongoose.Types.ObjectId(hallId)
                        }
                    }], function (err, result) {
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
            console.log('Hall_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.HallEntity.create({
                'name': data.name,
                'json': data.json
            }, cb)
        })
        .catch(err => {
            console.log('Hall_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function (hallId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.HallEntity.deleteOne({
                _id: mongoose.Types.ObjectId(hallId)
            }, cb)
        })
        .catch(err => {
            console.log('Hall_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let hallId = data.hallId;
                    Entity.HallEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(hallId)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                ((data.name == '' || data.name == undefined) ? result[0].name : data.name);
                                ((data.json == '' || data.json == undefined) ? result[0].json : data.json)
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.HallEntity.updateOne({
                        _id: data.hallId
                    }, {
                        $set: {
                            'name': data.name,
                            'json': data.json
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
            console.log('Hall_dataprovider_update: ' + err);
            cb(err, null)
        })
}