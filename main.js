const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
global._ = require('underscore');

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

function mongoTypeOf(value) {
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
}


// ==============MAIN PROGRAM==============
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'demo';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('user').aggregate([
        { $limit: 1 }
    ], (err, data) => {
        // console.log(err);
        data.toArray((err, docs) => {
            _.each(docs, (item) => {
                console.log(item);

                let keys = _.allKeys(item),
                    values = _.values(item);

                // console.log(keys);
                // console.log(values);

                typeList = _.map(keys, (k) => {
                    console.log(k + ' ( ' + item[k] + ' ) ' + ': ' + mongoTypeOf(item[k]));
                })
            })
        });
    })

    // db.collections((err, colList) => {
    //     _.each(colList, (item, idx, list) => {
    //         console.log(idx + ' - ' + item.collectionName);

    //         console.log('Collection info: ');
    //         db.collection(item.collectionName).aggregate([
    //             { $limit: 1 }
    //         ], (err, data) => {
    //             console.log(err);
    //             console.log(data.toArray());
    //         })

    //     })
    // })

    client.close();
});