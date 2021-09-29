/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const _ = require('underscore')

exports.makeNumbered = (data, sortType, nItems, nSkip) => {
  if (sortType.toLowerCase() == 'asc') {
    _.each(data, (item, idx) => {
      item['no'] = nSkip + idx + 1
    })
  } else {
    _.each(data, (item, idx) => {
      item['no'] = nItems - (nSkip + idx)
    })
  }

  return data
}
