/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
const mongoose = require('mongoose')
const async = require('async')
const _ = require('underscore')

const MongoConnect = require('../utils/MongoConnect')
const Entity = require('../core/entity')
const QueryDict = require('../utils').QueryDict
const QueryHelper = require('../utils').QueryHelper
const QueryBuilder = require('../utils').QueryBuilder

exports.getAll = function (data, cb) {
  MongoConnect.Connect()
    .then(() => {
      let qb = new QueryBuilder([
        ['$match', 'isDeleted', false, '$and'],
        ['$match', data.cols, data.q, '$or'],
        ['$sort', data.sBy, data.sType],
      ])

      // qb.debug()
      Entity.___ENTITY_NAME___.aggregate(
        [
          {
            $facet: {
              allData: qb.getQuery().concat(QueryDict.GetTotalItems),
              dataWithLimit: qb.getQuery().concat(QueryDict.LimitOffset(data.nSkip, data.nLimit)),
            },
          },
        ].concat(QueryDict.PaginateBy(data.limit)),
        (err, [result]) => {
          if (err) {
            cb(err, null)
          } else {
            if (result?.nItems == 0 || result?.nPages == null) {
              cb(2, null)
            } else {
              result.data = QueryHelper.makeNumbered(result.data, data.sType, result.nItems, data.nSkip)
              cb(null, result)
            }
          }
        }
      )
    })
    .catch((err) => {
      console.log('___COLLECTION_NAME____DataProvider_getAll: ' + err)
      cb(err, null)
    })
}

exports.getById = function (___ID___, cb) {
  MongoConnect.Connect()
    .then(() => {
      Entity.___ENTITY_NAME___.aggregate(
        [
          {
            $match: {
              _id: mongoose.Types.ObjectId(___ID___),
            },
          },
        ],
        function (err, result) {
          if (err) {
            cb(err, null)
          } else {
            if (!_.isEmpty(result)) {
              cb(null, result[0])
            } else {
              cb(3, null)
            }
          }
        }
      )
    })
    .catch((err) => {
      console.log('___COLLECTION_NAME____DataProvider_getById: ' + err)
      cb(err, null)
    })
}

exports.create = function (data, cb) {
  MongoConnect.Connect()
    .then(() => {
      Entity.___ENTITY_NAME___.create(___INSERT_ITEM___, cb)
    })
    .catch((err) => {
      console.log('___COLLECTION_NAME____DataProvider_create: ' + err)
      cb(err, null)
    })
}

exports.update = function (___COLLECTION_NAME___, cb) {
  MongoConnect.Connect()
    .then(() => {
      async.waterfall(
        [
          function (callback) {
            let ___ID___ = ___COLLECTION_NAME___.___ID___
            Entity.___ENTITY_NAME___.aggregate(
              [
                {
                  $match: {
                    _id: mongoose.Types.ObjectId(___ID___),
                  },
                },
              ],
              function (err, result) {
                if (err) {
                  callback(err, null)
                } else {
                  if (result.length > 0) {
                    ___CHECKING_STEP___
                    callback(null, ___COLLECTION_NAME___)
                  } else {
                    callback(3, null)
                  }
                }
              }
            )
          },
          function (___COLLECTION_NAME___, callback) {
            Entity.___ENTITY_NAME___.updateOne(
              {
                _id: ___COLLECTION_NAME___.___ID___,
              },
              {
                $set: ___UPDATE_ITEM___,
              },
              function (err, result) {
                if (!err) {
                  callback(null, result)
                } else {
                  callback(err, null)
                }
              }
            )
          },
        ],
        cb
      )
    })
    .catch((err) => {
      console.log('___COLLECTION_NAME____DataProvider_update: ' + err)
      cb(err, null)
    })
}

exports.delete = function (___ID___, cb) {
  MongoConnect.Connect()
    .then(() => {
      Entity.___ENTITY_NAME___.update(
        {
          _id: mongoose.Types.ObjectId(___ID___),
        },
        {
          isDeleted: true,
        },
        cb
      )
    })
    .catch((err) => {
      console.log('___COLLECTION_NAME____DataProvider_delete: ' + err)
      cb(err, null)
    })
}
