var request = require('request');
var DataProvider = require('../../data_provider/user');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (userId, cb) {
    DataProvider.getById(userId, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (userId, cb) {
    DataProvider.delete(userId, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}