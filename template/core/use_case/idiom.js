/**
 * Created by Phuong Duong on 07/02/2018
 */

var DataProvider = require('../../data_provider/idiom');

exports.getAll = function(cb) {
    DataProvider.getAll(cb);
}

exports.getAllABC = function(cb) {
    DataProvider.getAllABC(cb);
}

exports.getRandom = function(cb) {
    DataProvider.getRandom(cb);
}