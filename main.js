/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

global._ = require('underscore');
global.utils = require('./utils');
global.fs = require('fs');

const core = require('./core');
const MongoClient = require('mongodb').MongoClient;
const async = require('async');
const chalk = require('chalk');
const figlet = require('figlet');

//#region _____DEFAULT_VARIABLE_____

global.success = chalk.bold.green;
global.info = chalk.italic.bold.blue;
global.error = chalk.bold.red;
global.warning = chalk.bold.yellow;
global.comment = chalk.bold.bgBlue.white;
global.announce = chalk.bold.bgCyan.white;

var inputData = {
    // project variables
    name: 'demo-clean-api',
    version: '1.0.0',
    description: 'This is Demo API based on Clean architecture',
    main: 'server.js',
    repo: '',
    keywords: [
        'fpo',
        'api'
    ],
    author: 'FPO Co.,Ltd',
    license: 'ISC',
    output: './',

    // database variables
    host: 'localhost',
    port: '27017',
    dbName: 'demo',
    username: '',
    password: '',
    optional: ''
};
var root = '';

//#endregion

async.series([
    //#region _____GET_PROJECT_AND_DATABASE_INFO_____
    (callback) => {
        console.clear();

        console.log(figlet.textSync('Clean  API  Generator', {
            kerning: 'full'
        }));

        console.log(info('This utility will walk you through creating an API that based on Clean Architecture with Node.JS and Express.JS'));
        console.log(info('Developed by FPO Co.,Ltd'));
        console.log(info('Email: contact@fpo.vn'));
        console.log(info('\n'));
        console.log(info('Press Ctrl + C at any time to quit.\n'));

        callback();
    },
    (callback) => {
        core.data.read(inputData, (data) => {
            inputData = data
            callback()
        })
    },
    //#endregion
    //#region _____GENERATE_PROJECT_STRUCTURE_____
    (callback) => {
        var exitcode = 0;
        console.log(announce('\n__________________________________________________________________'));
        console.log(announce('____________________Generate project structure____________________'));
        console.log(announce('__________________________________________________________________'));

        root = inputData.output + '/' + inputData.name;
        if (!fs.existsSync(root)) {
            console.log(error('⚠️  Folder [' + root + '] does not exist.'));
            fs.mkdirSync(root);
            console.log(success('✅ Created [' + root + ' ] folder'));

            // Generate project structure
            exitcode = core.generateProjectStructure(root, inputData)
        } else {
            console.log(success('✅ Folder [' + root + '] exist!!!'));

            // Check empty project folder
            if (fs.readdirSync(root).length > 0) {
                console.log(error('❌ Folder [' + root + '] is not empty. Please try again !'));
                exitcode = 1
            } else {
                console.log(success('✅ Folder [' + root + '] is empty!!!'));

                // Generate project structure
                exitcode = core.generateProjectStructure(root, inputData)
            }
        }

        if (!exitcode) {
            callback(exitcode)
        } else {
            callback()
        }
    },
    //#endregion
    //#region _____GENERATE_CORE_FILES_BASED_ON_DATABASE_____
    (callback) => {
        console.log(announce('\n__________________________________________________________________'));
        console.log(announce('_______________Generate core files based on Database______________'));
        console.log(announce('__________________________________________________________________'));

        root = inputData.output + '/' + inputData.name;

        core.generateKernelFiles(root, inputData, function (err, data) {
            if (err) {
                console.log(error('❌  ' + utils.ErrorHandle.getErrorMessage(err)));
                callback(1);
            } else {
                console.log(success('\n✅ Generate Kernel files successfully !!!'));
                callback();
            }
        });
    },
    //#endregion
    //#region _____FINALIZE_GENERATE_PROCESS_____
    (callback) => {
        console.log(announce('\n__________________________________________________________________'));
        console.log(announce('_____________________Finalize generate process____________________'));
        console.log(announce('__________________________________________________________________'));

        console.log(info('🗃  Your project structure in `' + root + '`'));
        console.log('|___config');
        console.log('|___core');
        console.log('|   |___entity');
        console.log('|   |___use_case');
        console.log('|___data_provider');
        console.log('|___logs');
        console.log('|___routes');
        console.log('|___utils');
        console.log('|   .gitignore');
        console.log('|   package.json');
        console.log('|   README.md');
        console.log('|   server.js');

        console.log(info('\n🚀  Let\'s run the following command to begin: '));
        console.log(success('   🎯 cd ' + root));
        console.log(success('   🎯 npm install'));
        console.log(success('   🎯 node server.js'));

        callback();
    }
    //#endregion
], (exitcode) => {
    process.exit(exitcode);
})