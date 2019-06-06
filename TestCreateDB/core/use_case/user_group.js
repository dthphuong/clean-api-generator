var request = require('request');
var DataProvider = require('../../data_provider/user_group');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (user_groupId, cb) {
    DataProvider.getById(user_groupId, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (user_groupId, cb) {
    DataProvider.delete(user_groupId, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}