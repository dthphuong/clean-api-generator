/**
 * Created by Phuong Duong on 14/06/2019
 */

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function isJSON(json) {
    json = JSON.stringify(json)
    if (/^[\],:{}\s]*$/.test(json.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true;
    }
    return false;
}

exports.get = function (value) {
    if (!_.isUndefined(value) && !_.isNull(value)) {
        switch (typeof value) {
            case 'number':
                return 'Number'
            case 'string':
                return 'String'
            case 'object':
                if (_.isDate(value)) {
                    return 'Date'
                }
                if (value.toString().length == 24) {
                    return 'ObjectId'
                }
                if (isJSON(value)) {
                    return 'JSON'
                }

                return 'object'
            case 'boolean':
                return 'Boolean'
            default:
                return typeof value
        }
    } else {
        return undefined
    }
}
