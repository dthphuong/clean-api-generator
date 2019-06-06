var request = require('request');
var DataProvider = require('../../data_provider/attendance');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (attendanceId, cb) {
    DataProvider.getById(attendanceId, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (attendanceId, cb) {
    DataProvider.delete(attendanceId, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}