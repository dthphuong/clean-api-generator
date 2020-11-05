/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
var DataProvider = require('../../data_provider/user');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (_id, cb) {
    DataProvider.getById(_id, cb);
}

exports.create = function (userData, cb) {
    DataProvider.create(userData, cb);
}

exports.update = function (userData, cb) {
    DataProvider.update(userData, cb);
}

exports.delete = function (_id, cb) {
    DataProvider.delete(_id, cb);
}