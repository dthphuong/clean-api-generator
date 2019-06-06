var request = require('request');
var DataProvider = require('../../data_provider/event_hall');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (event_hallId, cb) {
    DataProvider.getById(event_hallId, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (event_hallId, cb) {
    DataProvider.delete(event_hallId, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}