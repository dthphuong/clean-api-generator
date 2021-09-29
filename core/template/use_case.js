/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
const DataProvider = require('../../data_provider/___COLLECTION_NAME___')

exports.getAll = function (___DATA___, cb) {
  DataProvider.getAll(___DATA___, cb)
}

exports.getById = function (___ID___, cb) {
  DataProvider.getById(___ID___, cb)
}

exports.create = function (___DATA___, cb) {
  DataProvider.create(___DATA___, cb)
}

exports.update = function (___DATA___, cb) {
  DataProvider.update(___DATA___, cb)
}

exports.delete = function (___ID___, cb) {
  DataProvider.delete(___ID___, cb)
}
