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
                    Entity.___ENTITY_NAME___.aggregate([], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (_.isEmpty(result)) {
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
            console.log('___COLLECTION_NAME____dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (___ID___, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.___ENTITY_NAME___.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(___ID___)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (_.isEmpty(result)) {
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
            console.log('___COLLECTION_NAME____dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.___ENTITY_NAME___.create(___INSERT_ITEM___, cb)
        })
        .catch(err => {
            console.log('___COLLECTION_NAME____dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.update = function (___COLLECTION_NAME___, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let ___ID___ = ___COLLECTION_NAME___.___ID___;
                    Entity.___ENTITY_NAME___.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(___ID___)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                ___CHECKING_STEP___
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (___COLLECTION_NAME___, callback) {
                    Entity.___ENTITY_NAME___.updateOne({
                        _id: ___COLLECTION_NAME___.___ID___
                    }, {
                            $set: ___UPDATE_ITEM___
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
            console.log('___COLLECTION_NAME____dataprovider_update: ' + err);
            cb(err, null)
        })
}

exports.delete = function (___ID___, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.___ENTITY_NAME___.deleteOne({
                _id: mongoose.Types.ObjectId(___ID___)
            }, cb)
        })
        .catch(err => {
            console.log('___COLLECTION_NAME____dataprovider_delete: ' + err);
            cb(err, null)
        })
}