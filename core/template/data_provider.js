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
                    Entity.DBENTITY.find({}, function (err, result) {
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
            console.log('DBNAME_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (NAMEID, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.DBENTITY.aggregate([{
                        $match: {
                            '_id': mongoose.Types.ObjectId(NAMEID)
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
            console.log('DBNAME_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.DBENTITY.create({
                DATA
            }, cb)
        })
        .catch(err => {
            console.log('DBNAME_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function (NAMEID, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.DBENTITY.deleteOne({
                _id: mongoose.Types.ObjectId(NAMEID)
            }, cb)
        })
        .catch(err => {
            console.log('DBNAME_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let NAMEID = data.NAMEID;
                    Entity.DBENTITY.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(NAMEID)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                UPDATE
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.DBENTITY.updateOne({
                        _id: data.NAMEID
                    }, {
                        $set: {
                            DATA
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
            console.log('DBNAME_dataprovider_update: ' + err);
            cb(err, null)
        })
}