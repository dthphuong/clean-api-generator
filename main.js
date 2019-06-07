global._ = require('underscore');

const MongoClient = require('mongodb').MongoClient;
const readline = require('readline');
const async = require('async');
const chalk = require('chalk');

var prompt = chalk.bold.green;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ============================================================================================
// ======================================DEFAULT VARIABLE======================================
// ============================================================================================
var inputData = {
    // project variables
    name: 'demo-clean-api',
    version: '1.0.0',
    description: 'This is Demo API based on Clean architecture',
    main: 'server.js',
    keyword: 'fpo,api',
    author: 'FPO Co.,Ltd',

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



async.series([
    (callback) => {
        rl.question(prompt('Question 1: '), (answer) => {
            inputData.ques1 = answer
            callback()
        })
    },
    (callback) => {
        rl.question(prompt('Question 2: '), (answer) => {
            inputData.ques2 = answer
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