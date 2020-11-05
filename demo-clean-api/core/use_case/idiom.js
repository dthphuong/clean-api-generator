/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
var DataProvider = require('../../data_provider/idiom');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (_id, cb) {
    DataProvider.getById(_id, cb);
}

exports.create = function (idiomData, cb) {
    DataProvider.create(idiomData, cb);
}

exports.update = function (idiomData, cb) {
    DataProvider.update(idiomData, cb);
}

exports.delete = function (_id, cb) {
    DataProvider.delete(_id, cb);
}