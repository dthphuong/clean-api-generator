var DataProvider = require('../../data_provider/___COLLECTION_NAME___');

exports.getAll = function (cb) {
    DataProvider.getAll(cb);
}

exports.getById = function (___ID___, cb) {
    DataProvider.getById(___ID___, cb);
}

exports.create = function (___ID___, cb) {
    DataProvider.create(___ID___, cb);
}

exports.update = function (___DATA___, cb) {
    DataProvider.update(___DATA___, cb);
}

exports.delete = function (___ID___, cb) {
    DataProvider.delete(___ID___, cb);
}