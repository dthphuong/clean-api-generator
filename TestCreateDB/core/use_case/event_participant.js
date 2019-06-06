var request = require('request');
var DataProvider = require('../../data_provider/event_participant');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (event_participantId, cb) {
    DataProvider.getById(event_participantId, cb);
}

exports.create = function (data, cb) {
    DataProvider.create(data, cb);
}

exports.delete = function (event_participantId, cb) {
    DataProvider.delete(event_participantId, cb);
}

exports.update = function (data, cb) {
    DataProvider.update(data, cb);
}