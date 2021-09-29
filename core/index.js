/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const fs = require('fs')
const _ = require('underscore')
const async = require('async')
const chalk = require('chalk')
const success = chalk.bold.green
const info = chalk.italic.bold.blue
const error = chalk.bold.red

const kernel = require('./kernel')
const ErrorHandle = require('../utils/ErrorHandle')
const IO = require('../utils/IO')

exports.data = require('./data')

exports.generateProjectStructure = function (root, inputData) {
  try {
    // Generate folder structure
    // fs.mkdirSync(root + '/config')
    fs.mkdirSync(root + '/core')
    fs.mkdirSync(root + '/core/entity')
    fs.mkdirSync(root + '/core/use_case')
    fs.mkdirSync(root + '/data_provider')
    fs.mkdirSync(root + '/logs')
    fs.mkdirSync(root + '/routes')
    fs.mkdirSync(root + '/utils')
    console.log(success('✅ Generate folder structure successfully!!!'))

    // Generate file`package.json`
    kernel.generatePackageJSON(root, inputData)

    // Generate file`clean-code-snippets.code-snippets`
    kernel.generateCodeSnippets(root)

    // Generate file`README.md`
    kernel.generateREADME(root)

    // Generate file`.env`
    kernel.generateDotENV(root, inputData)

    // Generate files`.gitignore`, `.eslintrc.json`, `.prettierrc.json`
    kernel.generateDotFiles(root)

    // Generate file`server.js`
    kernel.generateServer(root)

    // Generate files in `utils` folder
    kernel.generateUtilsDir(root)

    return 0
  } catch (err) {
    console.log(error('❌ ' + ErrorHandle.getErrorMessage(err)))
    console.log(`Error: ${err}`)
    return 1
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
            console.log(error('❌  ' + err))
            cb(err, null)
          } else {
            collections = _.pluck(collections, 'collectionName')

            if (_.isEmpty(collections)) {
              cb(2, null) // empty collection
            } else {
              // console.log(collections);
              kernel.root = root

              async.series(
                [
                  // 1. Generate Entities
                  (callback) => {
                    console.log(info('\n🤹🏼‍ Generating Entities . . . '))

                    let entityIndex = ''
                    _.each(collections, (colName) => {
                      entityIndex =
                        entityIndex +
                        `exports.${IO.toProperCase(colName)}Entity = require("./${colName}").${IO.toProperCase(
                          colName
                        )}Entity \n`
                    })
                    fs.writeFileSync(root + '/core/entity/index.js', entityIndex, 'utf8')

                    async.every(
                      collections,
                      (col, callback) => {
                        kernel.generateEntity(db, col, (err) => {
                          if (err) {
                            callback(err, false)
                          } else {
                            console.log(success('   🥁  Generated `' + col + '` entity'))
                            callback(null, true)
                          }
                        })
                      },
                      callback
                    )
                  },

                  // 2. Generate Data_Provider
                  (callback) => {
                    console.log(info('\n🤹🏼‍ Generating Data_Provider . . . '))

                    async.every(
                      collections,
                      (col, callback) => {
                        kernel.generateDataProvider(db, col, (err) => {
                          if (err) {
                            callback(err, false)
                          } else {
                            console.log(success('   🥁  Generated `' + col + '` Data_Provider'))
                            callback(null, true)
                          }
                        })
                      },
                      callback
                    )
                  },

                  // 3. Generate Use_case
                  (callback) => {
                    console.log(info('\n🤹🏼‍ Generating Use_case . . . '))

                    async.every(
                      collections,
                      (col, callback) => {
                        kernel.generateUseCase(col, (err) => {
                          if (err) {
                            callback(err, false)
                          } else {
                            console.log(success('   🥁  Generated `' + col + '` Use_case'))
                            callback(null, true)
                          }
                        })
                      },
                      callback
                    )
                  },

                  // 4. Generate Routes
                  (callback) => {
                    console.log(info('\n🤹🏼‍ Generating Routes . . . '))

                    // Generate Routes index
                    let routeIndex =
                      "const Middleware = require('../utils/Middleware')\nconst sysRoute = require('./system')\n"

                    _.each(collections, (colName) => {
                      routeIndex += 'const ' + IO.toProperCase(colName) + " = require('./" + colName + "')\n"
                    })

                    routeIndex += '\n\n'
                    routeIndex += 'exports.assignAPIRoutes = function (app) {\n'
                    routeIndex +=
                      "\tapp.get('/', (req, res) => {\n" +
                      "\t\treturn res.send('Hello world ! Welcome to Clean architecture for Node.JS project')\n" +
                      '\t})\n\n'
                    routeIndex += '\t//#region System route\n'
                    routeIndex += "\tapp.post('/system/decode', sysRoute.decode)\n"
                    routeIndex += "\tapp.post('/oauth', sysRoute.oauth)\n"
                    routeIndex += "\t// app.post('/APIwithToken', Middleware.authorized, sysRoute.oauth)\n"

                    _.each(collections, (colName) => {
                      routeIndex += '\n\t//#region ' + IO.toProperCase(colName) + ' route\n'

                      routeIndex += `
                      \tapp.get('/${colName}/getAll', Middleware.authorized, ${IO.toProperCase(colName)}.getAll)\n
                      \tapp.get('/${colName}/getById', Middleware.authorized, ${IO.toProperCase(colName)}.getById)\n
                      \tapp.post('/${colName}/create', Middleware.authorized, ${IO.toProperCase(colName)}.create)\n
                      \tapp.put('/${colName}/update', Middleware.authorized, ${IO.toProperCase(colName)}.update)\n
                      \tapp.delete('/${colName}/delete', Middleware.authorized, ${IO.toProperCase(colName)}.delete)\n
                      `
                    })
                    routeIndex += '}'

                    fs.writeFileSync(root + '/routes/index.js', routeIndex, 'utf8')

                    // Copy Route system
                    fs.copyFileSync(__dirname + '/template/systemRoute.js', root + '/routes/system.js')

                    // Generate Route file(s)
                    async.every(
                      collections,
                      (col, callback) => {
                        kernel.generateRoute(col, (err) => {
                          if (err) {
                            callback(err, false)
                          } else {
                            console.log(success('   🥁  Generated `' + col + '` route'))
                            callback(null, true)
                          }
                        })
                      },
                      callback
                    )
                  },
                ],
                cb
              )
            }
          }
        })
      }
    })
  } catch (err) {
    cb(err, null)
  }
}
