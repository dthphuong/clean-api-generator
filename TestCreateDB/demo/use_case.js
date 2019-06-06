var request = require('request');
var DataProvider = require('../../data_provider/[[DBNAME]]');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function ([[NAMEID1]], cb) {
    DataProvider.getById([[NAMEID2]], cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function ([[NAMEID3]], cb) {
    DataProvider.delete([[NAMEID4]], cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}