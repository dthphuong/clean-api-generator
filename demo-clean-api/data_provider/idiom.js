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
            Entity.IdiomEntity.find({}, function (err, result) {
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
            console.log('idiom_DataProvider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (_id, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.IdiomEntity.aggregate([{
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
            console.log('idiom_DataProvider_getById: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.IdiomEntity.create({
    "author": data.author,
    "sentence": data.sentence
}, cb)
        })
        .catch(err => {
            console.log('idiom_DataProvider_create: ' + err);
            cb(err, null)
        })
}

exports.update = function (idiom, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let _id = idiom._id;
                    Entity.IdiomEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(_id)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                idiom.author = ((idiom.author == '' || idiom.author == undefined) ? result[0].author : idiom.author);
idiom.sentence = ((idiom.sentence == '' || idiom.sentence == undefined) ? result[0].sentence : idiom.sentence);

                                callback(null, idiom)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (idiom, callback) {
                    Entity.IdiomEntity.updateOne({
                        _id: idiom._id
                    }, {
                        $set: {
    "author": idiom.author,
    "sentence": idiom.sentence
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
            console.log('idiom_DataProvider_update: ' + err);
            cb(err, null)
        })
}

exports.delete = function (_id, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.IdiomEntity.deleteOne({
                _id: mongoose.Types.ObjectId(_id)
            }, cb)
        })
        .catch(err => {
            console.log('idiom_DataProvider_delete: ' + err);
            cb(err, null)
        })
}