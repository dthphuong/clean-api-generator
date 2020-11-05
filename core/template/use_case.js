/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
var DataProvider = require('../../data_provider/___COLLECTION_NAME___');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (___ID___, cb) {
    DataProvider.getById(___ID___, cb);
}

exports.create = function (___DATA___, cb) {
    DataProvider.create(___DATA___, cb);
}

exports.update = function (___DATA___, cb) {
    DataProvider.update(___DATA___, cb);
}

exports.delete = function (___ID___, cb) {
    DataProvider.delete(___ID___, cb);
}