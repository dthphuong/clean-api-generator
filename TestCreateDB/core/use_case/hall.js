var request = require('request');
var DataProvider = require('../../data_provider/hall');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (hallId, cb) {
    DataProvider.getById(hallId, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (hallId, cb) {
    DataProvider.delete(hallId, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}