/**
 * Created by Phuong Duong on 07/02/2018
 */

var MongoConnect = require('../util/MongoConnect');
var Entity = require('../core/entity');

exports.getAll = function (cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            db.listCollections().toArray(function (err, collInfos) {
                cb(null, collInfos)
            });
            // Entity.idiomEntity.find({}, cb);
        })
        .catch(err => {
            console.log('idiom_dataprovider_getAll: ' + err);
        })

}

exports.getAllABC = function (cb) {
    MongoConnect.Connect(config.database.name)
        .then(db => {
            Entity.idiomEntity.find({}, cb);
        })
        .catch(err => {
            console.log('idiom_dataprovider_getAll: ' + err);
        })

}

exports.getRandom = function (cb) {
    Entity.idiomEntity.aggregate([
        { $sample: { size: 1 } }
    ], cb)
}