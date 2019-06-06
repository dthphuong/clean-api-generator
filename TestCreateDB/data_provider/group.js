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
                    Entity.GroupEntity.find({}, function (err, result) {
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
            console.log('Group_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (groupId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.GroupEntity.aggregate([{
                            $match: {
                                '_id': mongoose.Types.ObjectId(groupId)
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
            console.log('Group_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.GroupEntity.create({
                'name': data.name,'description': data.description,'level': data.level,'permissionList': data.permissionList
            }, cb)
        })
        .catch(err => {
            console.log('Group_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function (groupId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.GroupEntity.deleteOne({
                _id: mongoose.Types.ObjectId(groupId)
            }, cb)
        })
        .catch(err => {
            console.log('Group_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let groupId = data.groupId;
                    Entity.GroupEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(groupId)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                ((data.name =='' || data.name == undefined) ? result[0].name : data.name);((data.description =='' || data.description == undefined) ? result[0].description : data.description);((data.level =='' || data.level == undefined) ? result[0].level : data.level);((data.permissionList =='' || data.permissionList == undefined) ? result[0].permissionList : data.permissionList)
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.GroupEntity.updateOne({
                        _id: data.groupId
                    }, {
                        $set: {
                            'name': data.name,'description': data.description,'level': data.level,'permissionList': data.permissionList
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
            console.log('Group_dataprovider_update: ' + err);
            cb(err, null)
        })
}