var request = require('request');
var DataProvider = require('../../data_provider/template_hall');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (template_hallId, cb) {
    DataProvider.getById(template_hallId, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (template_hallId, cb) {
    DataProvider.delete(template_hallId, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}