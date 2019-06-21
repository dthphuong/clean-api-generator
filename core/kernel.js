/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const { exec } = require('child_process');
const async = require('async');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const MongooseType = require('../utils/Type')

const templatePath = __dirname + '/template/';

exports.root = './';

exports.generatePackageJSON = (root, projectInfo) => {
    var data = {
        "name": projectInfo.name,
        "version": projectInfo.version,
        "description": projectInfo.description,
        "main": projectInfo.main,
        "config": {
            "unsafe-perm": true
        },
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": projectInfo.keywords,
        "author": projectInfo.author,
        "license": projectInfo.license,
        "dependencies": {
            "async": "^3.0.1",
            "body-parser": "^1.19.0",
            "crypto-js": "^3.1.9-1",
            "express": "^4.17.1",
            "express-mailer": "^0.3.1",
            "express-rate-limit": "^3.4.0",
            "fcm-node": "^1.3.0",
            "fluent-ffmpeg": "^2.1.2",
            "formidable": "^1.1.1",
            "fs-extra": "^8.0.1",
            "html5-to-pdf": "^3.1.3",
            "jsonwebtoken": "^8.1.1",
            "mongoose": "^5.0.3",
            "mongoose-double": "0.0.1",
            "nodemailer": "^4.6.8",
            "randomstring": "^1.1.5",
            "request": "^2.83.0",
            "sharp": "^0.22.1",
            "slice": "^1.0.0",
            "socket.io": "^2.2.0",
            "underscore": "^1.9.1"
        }
    }

    if (projectInfo.repo != '') {
        data.repository = {
            "type": "git",
            "url": "git+" + projectInfo.repo + ".git"
        }

        data.bugs = {
            "url": projectInfo.repo + "/issues"
        }

        data.hompage = projectInfo.repo + "#readme"
    }
    try {
        fs.writeFileSync(root + '/package.json', JSON.stringify(data, null, 4))
        console.log(success('✅ Generate `package.json` file successfully --> Next !!!'));
    } catch (err) {
        throw err;
    }
}

exports.generateREADME = (root) => {
    try {
        let readmeData = fs.readFileSync(__dirname + '/template/README.md');
        fs.writeFileSync(root + '/README.md', readmeData);
        console.log(success('✅ Generate `README.md` file successfully --> Next !!!'));
    } catch (err) {
        throw err;
    }
}

exports.generateGitignore = (root) => {
    try {
        let gitignoreData = fs.readFileSync(__dirname + '/template/.gitignore');
        fs.writeFileSync(root + '/.gitignore', gitignoreData);
        console.log(success('✅ Generate `.gitignore` file successfully --> Next !!!'));
    } catch (err) {
        throw err;
    }
}

exports.generateServer = (root) => {
    try {
        let serverData = fs.readFileSync(__dirname + '/template/server.js');
        fs.writeFileSync(root + '/server.js', serverData);
        console.log(success('✅ Generate `server.js` file successfully --> Next !!!'));
    } catch (err) {
        throw err;
    }
}

exports.generateUtilsDir = (root) => {
    try {
        let copyCommand = 'cp -r ' + __dirname + '/template/utils ' + root
        exec(copyCommand, (err, stdout, stderr) => {
            if (err) {
                throw err;
            }
        })

        console.log(success('✅ Generate utils directory successfully --> Next !!!'));
    } catch (err) {
        throw err;
    }
}

exports.generateConfig = (root, databaseInfo) => {
    try {
        let configData = fs.readFileSync(__dirname + '/template/config.js').toString()
            .replace(new RegExp('HOST', 'g'), databaseInfo.host)
            .replace(new RegExp('PORT', 'g'), databaseInfo.port)
            .replace(new RegExp('DBNAME', 'g'), databaseInfo.dbName)
            .replace(new RegExp('USERNAME', 'g'), databaseInfo.username)
            .replace(new RegExp('PASSWORD', 'g'), databaseInfo.password)
            .replace(new RegExp('OPTIONAL', 'g'), databaseInfo.optional)
        fs.writeFileSync(root + '/config/index.js', configData);
        console.log(success('✅ Generate `config.js` file successfully --> Next !!!'));
    } catch (err) {
        throw err;
    }
}

exports.connectToMongoDB = (dbInfo, callback) => {
    var connectionString = '';

    if (dbInfo.username == '' || dbInfo.password == '') {
        connectionString = 'mongodb://' + dbInfo.host + ':' + dbInfo.port + '/' + dbInfo.dbName + dbInfo.optional;
    } else {
        connectionString = 'mongodb://' + dbInfo.username + ':' + dbInfo.password + '@' +
            dbInfo.host + ':' + dbInfo.port + "/" + dbInfo.dbName + dbInfo.optional;
    }

    // Use connect method to connect to the server
    console.log(info('🤹🏼‍ Connecting to database . . . '));
    MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log(error('   ❌ Failed to connect'));
            callback(err, null);
        } else {
            console.log(success('   ✅ Connected successfully to database'));

            const db = client.db(dbInfo.dbName);
            callback(null, db);
        }
    });
}

exports.generateEntity = (db, collectionName, callback) => {
    db.collection(collectionName).aggregate([
        { $limit: 1 }
    ], (err, data) => {
        if (err) {
            callback(err);
        } else {
            data.toArray((err, docs) => {
                let doc = docs[0];

                let keys = _.allKeys(doc);

                let fieldsList = {}
                _.each(keys, (k) => {
                    if (k != '_id') {
                        fieldsList[k] = "===" + utils.Type.get(doc[k]) + "==="
                    }
                })

                // Generate to file(s) here
                try {
                    let entityTemplate = fs.readFileSync(templatePath + 'entity.js', 'utf8');

                    entityTemplate = entityTemplate
                        .replace(/__SCHEMA_NAME__/g, utils.String.toProperCase(collectionName) + 'Schema')
                        .replace(/__ENTITY_NAME__/g, utils.String.toProperCase(collectionName) + 'Entity')
                        .replace(/__COLLECTION_NAME__/g, collectionName)
                        .replace(/__FIELDS_LIST__/g, JSON.stringify(fieldsList, null, 4))
                        .replace(/\"===/g, '')
                        .replace(/===\"/g, '')

                    fs.writeFileSync(this.root + '/core/entity/' + collectionName + '.js', entityTemplate, 'utf8');
                    callback(null);
                } catch (err) {
                    callback(err)
                }
            });
        }
    })
}

exports.generateUseCase = (collectionName, callback) => {
    try {
        let usecaseTemplate = fs.readFileSync(templatePath + 'use_case.js', 'utf8');

        usecaseTemplate = usecaseTemplate
            .replace(/___COLLECTION_NAME___/g, collectionName)
            .replace(/___ID___/g, collectionName + 'Id')
            .replace(/___DATA___/g, collectionName + 'Data')

        fs.writeFileSync(this.root + '/core/use_case/' + collectionName + '.js', usecaseTemplate, 'utf8');
        callback(null);
    } catch (err) {
        callback(err)
    }
}

exports.generateDataProvider = (db, collectionName, callback) => {
    try {
        db.collection(collectionName).aggregate([
            { $limit: 1 }
        ], (err, data) => {
            if (err) {
                callback(err);
            } else {
                data.toArray((err, docs) => {
                    let doc = docs[0];

                    let keys = _.allKeys(doc),
                        values = _.values(doc);

                    let fieldsList = {}
                    _.each(keys, (k) => {
                        fieldsList[k] = utils.Type.get(values[k])
                    })

                    // Start generate
                    let dvTemplate = fs.readFileSync(templatePath + 'data_provider.js', 'utf8');
                    let insertItem = {}, updateItem = {};
                    let checkingItem = '';
                    let checkingTemplate = "___COLLECTION_NAME___.___FIELD_NAME___ = ((___COLLECTION_NAME___.___FIELD_NAME___ == '' || ___COLLECTION_NAME___.___FIELD_NAME___ == undefined) ? result[0].___FIELD_NAME___ : ___COLLECTION_NAME___.___FIELD_NAME___);\n"


                    _.each(keys, (k) => {
                        if (k != '_id') {
                            insertItem[k] = '===data.' + k + '===,'

                            updateItem[k] = '===' + collectionName + '.' + k + '===,'
                            checkingItem += checkingTemplate
                                .replace(/___COLLECTION_NAME___/g, collectionName)
                                .replace(/___FIELD_NAME___/g, k)
                        }
                    })

                    dvTemplate = dvTemplate
                        .replace(/___COLLECTION_NAME___/g, collectionName)
                        .replace(/___ENTITY_NAME___/g, utils.String.toProperCase(collectionName) + 'Entity')
                        .replace(/___ID___/g, collectionName + 'Id')
                        .replace(/___INSERT_ITEM___/g, JSON.stringify(insertItem, null, 4))
                        .replace(/___UPDATE_ITEM___/g, JSON.stringify(updateItem, null, 4))
                        .replace(/===,\"/g, '')
                        .replace(/\"===/g, '')
                        .replace(/___CHECKING_STEP___/g, checkingItem)

                    fs.writeFileSync(this.root + '/data_provider/' + collectionName + '.js', dvTemplate, 'utf8');
                    callback(null);
                });
            }
        })
    } catch (err) {
        callback(err)
    }
}

exports.generateRoute = (collectionName, callback) => {
    try {
        let routeTemplate = fs.readFileSync(templatePath + 'route.js', 'utf8');

        routeTemplate = routeTemplate
            .replace(/___COLLECTION_NAME___/g, collectionName)
            .replace(/___ID___/g, collectionName + 'Id')

        fs.writeFileSync(this.root + '/routes/' + collectionName + '.js', routeTemplate, 'utf8');
        callback(null);
    } catch (err) {
        callback(err)
    }
}