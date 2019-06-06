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
                    Entity.UserEntity.find({}, function (err, result) {
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
            console.log('User_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (userId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.UserEntity.aggregate([{
                            $match: {
                                '_id': mongoose.Types.ObjectId(userId)
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
            console.log('User_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.UserEntity.create({
                'username': data.username,'password': data.password,'fullname': data.fullname,'phone': data.phone,'email': data.email,'facebook': data.facebook,'address': data.address,'work': data.work,'avatar': data.avatar
            }, cb)
        })
        .catch(err => {
            console.log('User_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function (userId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.UserEntity.deleteOne({
                _id: mongoose.Types.ObjectId(userId)
            }, cb)
        })
        .catch(err => {
            console.log('User_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let userId = data.userId;
                    Entity.UserEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(userId)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                ((data.username =='' || data.username == undefined) ? result[0].username : data.username);((data.password =='' || data.password == undefined) ? result[0].password : data.password);((data.fullname =='' || data.fullname == undefined) ? result[0].fullname : data.fullname);((data.phone =='' || data.phone == undefined) ? result[0].phone : data.phone);((data.email =='' || data.email == undefined) ? result[0].email : data.email);((data.facebook =='' || data.facebook == undefined) ? result[0].facebook : data.facebook);((data.address =='' || data.address == undefined) ? result[0].address : data.address);((data.work =='' || data.work == undefined) ? result[0].work : data.work);((data.avatar =='' || data.avatar == undefined) ? result[0].avatar : data.avatar)
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.UserEntity.updateOne({
                        _id: data.userId
                    }, {
                        $set: {
                            'username': data.username,'password': data.password,'fullname': data.fullname,'phone': data.phone,'email': data.email,'facebook': data.facebook,'address': data.address,'work': data.work,'avatar': data.avatar
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
            console.log('User_dataprovider_update: ' + err);
            cb(err, null)
        })
}