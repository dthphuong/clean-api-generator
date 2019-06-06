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
                    Entity.Template_hallEntity.find({}, function (err, result) {
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
            console.log('Template_hall_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.getById = function (template_hallId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    Entity.Template_hallEntity.aggregate([{
                            $match: {
                                '_id': mongoose.Types.ObjectId(template_hallId)
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
            console.log('Template_hall_dataprovider_getAll: ' + err);
            cb(err, null)
        })
}

exports.create = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.Template_hallEntity.create({
                'name': data.name,'json': data.json
            }, cb)
        })
        .catch(err => {
            console.log('Template_hall_dataprovider_create: ' + err);
            cb(err, null)
        })
}

exports.delete = function (template_hallId, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.Template_hallEntity.deleteOne({
                _id: mongoose.Types.ObjectId(template_hallId)
            }, cb)
        })
        .catch(err => {
            console.log('Template_hall_dataprovider_delete: ' + err);
            cb(err, null)
        })
}

exports.update = function (data, cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            async.waterfall([
                function (callback) {
                    let template_hallId = data.template_hallId;
                    Entity.Template_hallEntity.aggregate([{
                        $match: {
                            _id: mongoose.Types.ObjectId(template_hallId)
                        }
                    }], function (err, result) {
                        if (err) {
                            callback(err, null)
                        } else {
                            if (result.length > 0) {
                                ((data.name =='' || data.name == undefined) ? result[0].name : data.name);((data.json =='' || data.json == undefined) ? result[0].json : data.json)
                                callback(null, data)
                            } else {
                                callback(3, null)
                            }
                        }
                    })
                },
                function (data, callback) {
                    Entity.Template_hallEntity.updateOne({
                        _id: data.template_hallId
                    }, {
                        $set: {
                            'name': data.name,'json': data.json
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
            console.log('Template_hall_dataprovider_update: ' + err);
            cb(err, null)
        })
}