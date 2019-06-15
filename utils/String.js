/**
 * Created by Phuong Duong on 07/06/2019
 */
'use strict'

exports.trimKeywords = function (keyword) {
    return _.map(keyword.trim().split(','), (item) => {
        return item.trim()
    })
}

//#region Upper Title case
exports.toProperCase = (str) => {
    return str.replace(
        /(^|[\s\xA0])[^\s\xA0]/g,
        function (txt) {
            return txt.toUpperCase();
        }
    );
}

exports.toProperCase2 = (str) => {
    return str.replace(
        /(^|[\s\xA0])[^\s\xA0]/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
//#endregion