/**
 * Created by Phuong Duong on 07/06/2019
 */
global._ = require('underscore');
global.utils = require('./utils')

const MongoClient = require('mongodb').MongoClient;
const readline = require('readline');
const async = require('async');
const chalk = require('chalk');
const figlet = require('figlet');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ============================================================================================
// ======================================DEFAULT VARIABLE======================================
// ============================================================================================
var ask = chalk.bold.red,
    info = chalk.italic.white,
    comment = chalk.bold.bgBlue.white;

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

    // database variables
    host: 'localhost',
    port: 27017,
    dbName: 'demo',
    username: '',
    password: '',
    optional: ''
};
// ============================================================================================
// ===================================#END DEFAULT VARIABLE====================================
// ============================================================================================


// ============================================================================================
// ========================================MAIN PROGRAM========================================
// ============================================================================================
console.clear();

console.log(figlet.textSync('Clean  API  Generator', {
    kerning: 'full'
}));

console.log(info('This utility will walk you through creating an API that based on Clean Architecture with Node.JS and Express.JS'));
console.log(info('Developed by FPO Co.,Ltd'));
console.log(info('Email: contact@fpo.vn'));
console.log(info('\n'));
console.log(info('Press Ctrl + C at any time to quit.\n'));

async.series([
    (callback) => {
        console.log(comment('______________________________________________________'));
        console.log(comment('____________________Project config____________________'));
        console.log(comment('______________________________________________________'));
        rl.question(ask('📒 project name: (demo-clean-api) '), (answer) => {
            inputData.name = (answer == '') ? inputData.name : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('1️⃣ version: (1.0.0) '), (answer) => {
            inputData.version = (answer == '') ? inputData.version : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('📃 description: '), (answer) => {
            inputData.description = (answer == '') ? inputData.description : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('📌 run file: (server.js) '), (answer) => {
            inputData.main = (answer == '') ? inputData.main : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('📦 git repository: '), (answer) => {
            inputData.repo = (answer == '') ? inputData.repo : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('🏷  keywords: '), (answer) => {
            inputData.keywords = (answer == '') ? inputData.keywords : utils.String.trimKeywords(answer)
            callback()
        })
    },
    (callback) => {
        rl.question(ask('👤 author: '), (answer) => {
            inputData.author = (answer == '') ? inputData.author : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('🗝️  license: (ISC) '), (answer) => {
            inputData.license = (answer == '') ? inputData.license : answer
            callback()
        })
    },
    (callback) => {
        console.log(comment('_______________________________________________________'));
        console.log(comment('____________________Database config____________________'));
        console.log(comment('_______________________________________________________'));
        rl.question(ask('🌐 host: (localhost) '), (answer) => {
            inputData.host = (answer == '') ? inputData.host : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('🚪 port: (27017) '), (answer) => {
            inputData.port = (answer == '') ? inputData.port : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('🗂 dbName: (demo) '), (answer) => {
            inputData.dbName = (answer == '') ? inputData.dbName : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('👤 username: '), (answer) => {
            inputData.username = (answer == '') ? inputData.username : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('🔐 password: '), (answer) => {
            inputData.password = (answer == '') ? inputData.password : answer
            callback()
        })
    },
    (callback) => {
        rl.question(ask('ℹ️ optional: '), (answer) => {
            inputData.optional = (answer == '') ? inputData.optional : answer
            callback()
        })
    }
], () => {
    rl.close()

    console.log(inputData);
})
// ============================================================================================
// ======================================#END MAIN PROGRAM=====================================
// ============================================================================================