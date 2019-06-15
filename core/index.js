/**
 * Created by Phuong Duong on 08/06/2019
 */
const { exec } = require('child_process');
const kernel = require('./kernel');
const async = require('async');

exports.data = require('./data');

exports.generateProjectStructure = function (root, inputData) {
    try {
        // Generate folder structure
        fs.mkdirSync(root + '/config');
        fs.mkdirSync(root + '/core');
        fs.mkdirSync(root + '/core/entity');
        fs.mkdirSync(root + '/core/use_case');
        fs.mkdirSync(root + '/data_provider');
        fs.mkdirSync(root + '/logs');
        fs.mkdirSync(root + '/routes');
        fs.mkdirSync(root + '/utils');
        console.log(success('✅ Generate folder structure successfully --> Next !!!'));

        // Generate file`package.json`
        kernel.generatePackageJSON(root, inputData);

        // Generate file`README.md`
        kernel.generateREADME(root);

        // Generate file`.gitignore`
        kernel.generateGitignore(root);

        // Generate file`server.js`
        kernel.generateServer(root);

        // Generate files in `utils` folder
        kernel.generateUtilsDir(root);

        // Generate file`config.js`
        kernel.generateConfig(root, inputData);

        console.log(success('✅ Generate utils directory successfully --> Next !!!'));

        return 0;
    } catch (err) {
        console.log(error('❌ ' + utils.ErrorHandle.getErrorMessage(err)));
        return 1;
    }
}

exports.generateKernelFiles = function (inputData, cb) {
    try {
        kernel.connectToMongoDB(inputData, (err, db) => {
            if (err) {
                cb(err, null)
            } else {
                db.collections((err, collections) => {
                    if (err) {
                        console.log(error('❌  ' + err));
                        cb(err, null);
                    } else {
                        collections = _.pluck(collections, 'collectionName')

                        if (_.isEmpty(collections)) {
                            cb(2, null); // empty collection
                        } else {
                            console.log(collections);
                            async.every(collections, (col, callback) => {
                                kernel.generateEntities(db, col, (err) => {
                                    if (err) {
                                        callback(err, false)
                                    } else {
                                        callback(null, true)
                                    }
                                })
                            }, cb)
                        }
                    }
                })
            }
        })

        // console.log(success('✅ Generate Kernel files successfully --> Next !!!'));
    } catch (err) {
        cb(err, null)
    }
}