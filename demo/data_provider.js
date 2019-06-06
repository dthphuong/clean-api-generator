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
                    Entity.[[DBENTITY]].find({}, function (err, result) {
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
            console.log('[[DBNAME]]_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function ([[NAMEID]], cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.[[DBENTITY1]].aggregate([{
                            $match: {
                                '_id': mongoose.Types.ObjectId([[NAMEID1]])
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
            console.log('[[DBNAME1]]_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.[[DBENTITY2]].create({
                [[RESET_TYPE]]
            }, cb)
        })
        .catch(err => {
            console.log('[[DBNAME2]]_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function ([[NAMEID2]], cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.[[DBENTITY3]].deleteOne({
                _id: mongoose.Types.ObjectId([[NAMEID3]])
            }, cb)
        })
        .catch(err => {
            console.log('[[DBNAME3]]_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let [[NAMEID4]] = data.[[NAMEID5]];
                    Entity.[[DBENTITY4]].aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId([[NAMEID6]])
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                [[UPDATE]]
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.[[DBENTITY5]].updateOne({
                        _id: data.[[NAMEID7]]
                    }, {
                        $set: {
                            [[RESET_TYPE1]]
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
            console.log('[[DBNAME4]]_dataprovider_update: ' + err);
            cb(err, null)
        })
}