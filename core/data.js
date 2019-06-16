/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const readline = require('readline');
const async = require('async');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.read = function (inputData, cb) {
    async.series([
        (callback) => {
            console.log(comment('______________________________________________________'));
            console.log(comment('____________________Project config____________________'));
            console.log(comment('______________________________________________________'));
            rl.question(success('📒 project name: (demo-clean-api) '), (answer) => {
                inputData.name = (answer == '') ? inputData.name : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('1️⃣ version: (1.0.0) '), (answer) => {
                inputData.version = (answer == '') ? inputData.version : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('📃 description: '), (answer) => {
                inputData.description = (answer == '') ? inputData.description : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('📌 run file: (server.js) '), (answer) => {
                inputData.main = (answer == '') ? inputData.main : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('📦 git repository: '), (answer) => {
                inputData.repo = (answer == '') ? inputData.repo : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('🏷  keywords: '), (answer) => {
                inputData.keywords = (answer == '') ? inputData.keywords : utils.String.trimKeywords(answer)
                callback()
            })
        },
        (callback) => {
            rl.question(success('👤 author: '), (answer) => {
                inputData.author = (answer == '') ? inputData.author : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('🗝️  license: (ISC) '), (answer) => {
                inputData.license = (answer == '') ? inputData.license : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('🔗 output: (./) '), (answer) => {
                inputData.output = (answer == '') ? inputData.output : answer
                callback()
            })
        },
        (callback) => {
            console.log(comment('_______________________________________________________'));
            console.log(comment('____________________Database config____________________'));
            console.log(comment('_______________________________________________________'));
            rl.question(success('🌐 host: (localhost) '), (answer) => {
                inputData.host = (answer == '') ? inputData.host : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('🚪 port: (27017) '), (answer) => {
                inputData.port = (answer == '') ? inputData.port : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('🗂 dbName: (demo) '), (answer) => {
                inputData.dbName = (answer == '') ? inputData.dbName : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('👤 username: '), (answer) => {
                inputData.username = (answer == '') ? inputData.username : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('🔐 password: '), (answer) => {
                inputData.password = (answer == '') ? inputData.password : answer
                callback()
            })
        },
        (callback) => {
            rl.question(success('ℹ️ optional: '), (answer) => {
                inputData.optional = (answer == '') ? inputData.optional : answer
                callback(inputData)
            })
        }
    ], (inputData) => {
        rl.close()
        cb(inputData)
    })
}