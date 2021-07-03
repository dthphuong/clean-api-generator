/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
var mongoose = require('mongoose')
var async = require('async'),
    _ = require('underscore'),
    utils = require('../utils');

var MongoConnect = require('../utils/MongoConnect'),
    Entity = require('../core/entity');

exports.getAll = function (cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.UserEntity.find({}, function (err, result) {
                if (err) {
                    cb(err, null)
                } else {
                    if (!_.isEmpty(result)) {
                        cb(null, result)
                    } else {
                        cb(2, null)
                    }
                }
            })
        })
        .catch(err => {
            console.log('user_DataProvider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (_id, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.UserEntity.aggregate([{
                $match: {
                    _id: mongoose.Types.ObjectId(_id)
                }
            }], function (err, result) {
                if (err) {
                    cb(err, null)
                } else {
                    if (!_.isEmpty(result)) {
                        cb(null, result[0])
                    } else {
                        cb(3, null)
                    }
                }
            })
        })
        .catch(err => {
            console.log('user_DataProvider_getById: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.UserEntity.create({
    "name": data.name,
    "age": data.age,
    "birthday": data.birthday,
    "gender": data.gender,
    "json": data.json
}, cb)
        })
        .catch(err => {
            console.log('user_DataProvider_create: ' + err);
            cb(err, null)
        })
}

exports.update = function (user, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let _id = user._id;
                    Entity.UserEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(_id)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                user.name = ((user.name == '' || user.name == undefined) ? result[0].name : user.name);
user.age = ((user.age == '' || user.age == undefined) ? result[0].age : user.age);
user.birthday = ((user.birthday == '' || user.birthday == undefined) ? result[0].birthday : user.birthday);
user.gender = ((user.gender == '' || user.gender == undefined) ? result[0].gender : user.gender);
user.json = ((user.json == '' || user.json == undefined) ? result[0].json : user.json);

                                callback(null, user)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (user, callback) {
                    Entity.UserEntity.updateOne({
                        _id: user._id
                    }, {
                        $set: {
    "name": user.name,
    "age": user.age,
    "birthday": user.birthday,
    "gender": user.gender,
    "json": user.json
}
                    }, function (err, result) {
                        if (!err) {
                            callback(null, result)
                        } else {
                            callback(err, null)
                        }
                    })
                }

            ], cb)
        })
        .catch(err => {
            console.log('user_DataProvider_update: ' + err);
            cb(err, null)
        })
}

exports.delete = function (_id, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.UserEntity.deleteOne({
                _id: mongoose.Types.ObjectId(_id)
            }, cb)
        })
        .catch(err => {
            console.log('user_DataProvider_delete: ' + err);
            cb(err, null)
        })
}