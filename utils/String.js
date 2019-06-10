/**
 * Created by Phuong Duong on 07/06/2019
 */
'use strict'

exports.trimKeywords = function (keyword) {
    return _.map(keyword.trim().split(','), (item) => {
        return item.trim()
    })
}