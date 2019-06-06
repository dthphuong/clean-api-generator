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
                    Entity.User_groupEntity.find({}, function (err, result) {
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
            console.log('User_group_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (user_groupId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.User_groupEntity.aggregate([{
                            $match: {
                                '_id': mongoose.Types.ObjectId(user_groupId)
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
            console.log('User_group_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.User_groupEntity.create({
                'userId':  mongoose.Types.ObjectId(data.userId),'groupId':  mongoose.Types.ObjectId(data.groupId)
            }, cb)
        })
        .catch(err => {
            console.log('User_group_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function (user_groupId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.User_groupEntity.deleteOne({
                _id: mongoose.Types.ObjectId(user_groupId)
            }, cb)
        })
        .catch(err => {
            console.log('User_group_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let user_groupId = data.user_groupId;
                    Entity.User_groupEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(user_groupId)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                ((data.userId =='' || data.userId == undefined) ? result[0].userId : mongoose.Types.ObjectId (data.userId));((data.groupId =='' || data.groupId == undefined) ? result[0].groupId : mongoose.Types.ObjectId (data.groupId))
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.User_groupEntity.updateOne({
                        _id: data.user_groupId
                    }, {
                        $set: {
                            'userId':  mongoose.Types.ObjectId(data.userId),'groupId':  mongoose.Types.ObjectId(data.groupId)
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
            console.log('User_group_dataprovider_update: ' + err);
            cb(err, null)
        })
}