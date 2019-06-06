var request = require('request');
var DataProvider = require('../../data_provider/DBNAME');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (NAMEID, cb) {
    DataProvider.getById(NAMEID, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (NAMEID, cb) {
    DataProvider.delete(NAMEID, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}