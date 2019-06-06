var request = require('request');
var DataProvider = require('../../data_provider/participant');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (participantId, cb) {
    DataProvider.getById(participantId, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (participantId, cb) {
    DataProvider.delete(participantId, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}