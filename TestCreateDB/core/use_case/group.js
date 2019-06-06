var request = require('request');
var DataProvider = require('../../data_provider/group');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (groupId, cb) {
    DataProvider.getById(groupId, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (groupId, cb) {
    DataProvider.delete(groupId, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}