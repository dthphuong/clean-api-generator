var request = require('request');
var DataProvider = require('../../data_provider/event');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (eventId, cb) {
    DataProvider.getById(eventId, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (eventId, cb) {
    DataProvider.delete(eventId, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}