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

exports.generateKernelFiles = function (root, inputData, cb) {
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
                            // console.log(collections);
                            kernel.root = root;

                            async.series([
                                // 1. Generate Entities
                                (callback) => {
                                    console.log(info('\n🤹🏼‍ Generating Entities . . . '));

                                    let entityIndex = ''
                                    _.each(collections, (colName) => {
                                        entityIndex = entityIndex + 'exports.' + utils.String.toProperCase(colName) + 'Entity = require("./' + colName + '").' + utils.String.toProperCase(colName) + 'Entity; \n'
                                    })
                                    fs.writeFileSync(root + '/core/entity/index.js', entityIndex, 'utf8');

                                    async.every(collections, (col, callback) => {
                                        kernel.generateEntity(db, col, (err) => {
                                            if (err) {
                                                callback(err, false)
                                            } else {
                                                console.log(success('   🥁  Generated `' + col + '` entity'));
                                                callback(null, true)
                                            }
                                        })
                                    }, callback)
                                },

                                // 2. Generate Data_Provider
                                (callback) => {
                                    console.log(info('\n🤹🏼‍ Generating Data_Provider . . . '));

                                    async.every(collections, (col, callback) => {
                                        kernel.generateDataProvider(db, col, (err) => {
                                            if (err) {
                                                callback(err, false)
                                            } else {
                                                console.log(success('   🥁  Generated `' + col + '` Data_Provider'));
                                                callback(null, true)
                                            }
                                        })
                                    }, callback)
                                },

                                // 3. Generate Use_case
                                (callback) => {
                                    console.log(info('\n🤹🏼‍ Generating Use_case . . . '));

                                    async.every(collections, (col, callback) => {
                                        kernel.generateUseCase(col, (err) => {
                                            if (err) {
                                                callback(err, false)
                                            } else {
                                                console.log(success('   🥁  Generated `' + col + '` Use_case'));
                                                callback(null, true)
                                            }
                                        })
                                    }, callback)
                                },

                                // 4. Generate Routes
                                (callback) => {
                                    console.log(info('\n🤹🏼‍ Generating Routes . . . '));

                                    // Generate Routes index
                                    let routeIndex = "var sysRoute = require('./system');\n";

                                    _.each(collections, (colName) => {
                                        routeIndex += "var " + utils.String.toProperCase(colName) + " = require('./" + colName + "');\n";
                                    })

                                    routeIndex += "\n\n";
                                    routeIndex += "exports.assignAPIRoutes = function (app) {\n"
                                    routeIndex += "\tapp.get('/', (req, res) => {\n" +
                                        "\t\treturn res.send('Hello world ! Welcome to Clean architecture for Node.JS project')\n" +
                                        "\t});\n\n"
                                    routeIndex += "\t//#region System route\n"
                                    routeIndex += "\tapp.post('/system/decode', sysRoute.decode);\n"

                                    _.each(collections, (colName) => {
                                        routeIndex += "\n\t//#region " + utils.String.toProperCase(colName) + " route\n"

                                        routeIndex += "\tapp.post('/" + colName + "/getAll', " + utils.String.toProperCase(colName) + ".getAll);\n";
                                        routeIndex += "\tapp.post('/" + colName + "/getById', " + utils.String.toProperCase(colName) + ".getById);\n";
                                        routeIndex += "\tapp.post('/" + colName + "/create', " + utils.String.toProperCase(colName) + ".create);\n";
                                        routeIndex += "\tapp.post('/" + colName + "/update', " + utils.String.toProperCase(colName) + ".update);\n";
                                        routeIndex += "\tapp.post('/" + colName + "/delete', " + utils.String.toProperCase(colName) + ".delete);\n";
                                    })
                                    routeIndex += "}"

                                    fs.writeFileSync(root + '/routes/index.js', routeIndex, 'utf8');

                                    // Copy Route system
                                    fs.copyFileSync(__dirname + '/template/systemRoute.js', root + '/routes/system.js');

                                    // Generate Route file(s)
                                    async.every(collections, (col, callback) => {
                                        kernel.generateRoute(col, (err) => {
                                            if (err) {
                                                callback(err, false)
                                            } else {
                                                console.log(success('   🥁  Generated `' + col + '` route'));
                                                callback(null, true)
                                            }
                                        })
                                    }, callback)
                                },
                            ], cb)
                        }
                    }
                })
            }
        })
    } catch (err) {
        cb(err, null)
    }
}