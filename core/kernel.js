/* eslint-disable no-useless-catch */
/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const { exec } = require('child_process')
const fs = require('fs')
const _ = require('underscore')
const MongoClient = require('mongodb').MongoClient
const chalk = require('chalk')
const success = chalk.bold.green
const info = chalk.italic.bold.blue
const error = chalk.bold.red

const myType = require('../utils/Type')
const IO = require('../utils/IO')

const templatePath = __dirname + '/template/'

exports.root = './'

exports.generatePackageJSON = (root, projectInfo) => {
  var data = {
    name: projectInfo.name,
    version: projectInfo.version,
    description: projectInfo.description,
    main: projectInfo.main,
    config: {
      'unsafe-perm': true,
    },
    scripts: {
      prettyme: 'prettier --write "./**/*.{js,jsx,json}"',
    },
    keywords: projectInfo.keywords,
    author: projectInfo.author,
    license: projectInfo.license,
    dependencies: {
      async: '^3.2.1',
      bcrypt: '^5.0.1',
      cors: '^2.8.5',
      dotenv: '^10.0.0',
      express: '^4.17.1',
      'express-rate-limit': '^5.3.0',
      formidable: '^1.2.2',
      jsonwebtoken: '^8.5.1',
      lodash: '^4.17.21',
      mongoose: '^6.0.7',
      morgan: '^1.10.0',
      nodemailer: '^6.6.5',
      'socket.io': '^4.2.0',
      underscore: '^1.10.2',
    },
    devDependencies: {
      eslint: '^7.32.0',
      husky: '^7.0.2',
      'lint-staged': '^11.1.2',
      prettier: '^2.4.1',
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
      },
    },
    'lint-staged': {
      '*.{js,md}': ['prettier --write'],
    },
  }

  if (projectInfo.repo != '') {
    data.repository = {
      type: 'git',
      url: 'git+' + projectInfo.repo + '.git',
    }

    data.bugs = {
      url: projectInfo.repo + '/issues',
    }

    data.hompage = projectInfo.repo + '#readme'
  }
  try {
    fs.writeFileSync(root + '/package.json', JSON.stringify(data, null, 2))
    console.log(success('✅ Generate `package.json` file successfully --> Next !!!'))
  } catch (err) {
    throw err
  }
}

exports.generateCodeSnippets = (root) => {
  try {
    fs.mkdirSync(root + '/.vscode')
    let snippetsData = fs.readFileSync(__dirname + '/template/clean-code-snippets.code-snippets')
    fs.writeFileSync(root + '/.vscode/clean-code-snippets.code-snippets', snippetsData)
    console.log(success('✅ Generate `clean-code-snippets.code-snippets` file successfully --> Next !!!'))
  } catch (err) {
    throw err
  }
}

exports.generateREADME = (root) => {
  try {
    let readmeData = fs.readFileSync(__dirname + '/template/README.md')
    fs.writeFileSync(root + '/README.md', readmeData)
    console.log(success('✅ Generate `README.md` file successfully --> Next !!!'))
  } catch (err) {
    throw err
  }
}

exports.generateDotFiles = (root) => {
  try {
    let gitignoreData = fs.readFileSync(__dirname + '/template/.gitignore')
    fs.writeFileSync(root + '/.gitignore', gitignoreData)
    console.log(success('✅ Generate `.gitignore` file successfully --> Next !!!'))

    let prettierData = fs.readFileSync(__dirname + '/template/.prettierrc.json')
    fs.writeFileSync(root + '/.prettierrc.json', prettierData)
    console.log(success('✅ Generate `.prettierrc.json` file successfully --> Next !!!'))

    let eslintData = fs.readFileSync(__dirname + '/template/.eslintrc.json')
    fs.writeFileSync(root + '/.eslintrc.json', eslintData)
    console.log(success('✅ Generate `.eslintrc.json` file successfully --> Next !!!'))
  } catch (err) {
    throw err
  }
}

exports.generateServer = (root) => {
  try {
    let serverData = fs.readFileSync(__dirname + '/template/server.js')
    fs.writeFileSync(root + '/server.js', serverData)
    console.log(success('✅ Generate `server.js` file successfully --> Next !!!'))
  } catch (err) {
    throw err
  }
}

exports.generateUtilsDir = (root) => {
  try {
    let copyCommand = 'cp -r ' + __dirname + '/template/utils ' + root
    // eslint-disable-next-line no-unused-vars
    exec(copyCommand, (err, stdout, stderr) => {
      if (err) {
        throw err
      }
    })

    console.log(success('✅ Generate utils directory successfully --> Next !!!'))
  } catch (err) {
    throw err
  }
}

exports.generateDotENV = (root, databaseInfo) => {
  try {
    let envData = fs
      .readFileSync(__dirname + '/template/.env.example')
      .toString()
      .replace(new RegExp('__HOST__', 'g'), databaseInfo.host)
      .replace(new RegExp('__PORT__', 'g'), databaseInfo.port)
      .replace(new RegExp('__DBNAME__', 'g'), databaseInfo.dbName)
      .replace(new RegExp('__USERNAME__', 'g'), databaseInfo.username)
      .replace(new RegExp('__PASSWORD__', 'g'), databaseInfo.password)
    fs.writeFileSync(root + '/.env', envData)
    console.log(success('✅ Generate `.env` file successfully --> Next !!!'))
  } catch (err) {
    throw err
  }
}

exports.connectToMongoDB = (dbInfo, callback) => {
  let connectionString = ''

  if (dbInfo.username == '' || dbInfo.password == '') {
    connectionString = `mongodb://${dbInfo.host}:${dbInfo.port}/${dbInfo.dbName}`
  } else {
    connectionString = `mongodb://${dbInfo.username}:${dbInfo.password}@${dbInfo.host}:${dbInfo.port}/${dbInfo.dbName}`
  }

  // Use connect method to connect to the server
  console.log(info('🤹🏼‍ Connecting to database . . . '))
  MongoClient.connect(
    connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    },
    function (err, client) {
      if (err) {
        console.log(error('   ❌ Failed to connect'))
        callback(err, null)
      } else {
        console.log(success('   ✅ Connected successfully to database'))

        const db = client.db(dbInfo.dbName)
        callback(null, db)
      }
    }
  )
}

exports.generateEntity = (db, collectionName, callback) => {
  db.collection(collectionName).aggregate([{ $limit: 1 }], (err, data) => {
    if (err) {
      callback(err)
    } else {
      data.toArray((err, docs) => {
        let doc = docs[0]

        let keys = _.allKeys(doc)

        let fieldsList = {}
        _.each(keys, (k) => {
          if (k != '_id') {
            switch (k) {
              case 'isDeleted':
                fieldsList[k] = `==={ type: ${myType.get(doc[k])}, default: false }===`
                break
              default:
                fieldsList[k] = '===' + myType.get(doc[k]) + '==='
                break
            }
          }
        })

        // Generate to file(s) here
        try {
          let entityTemplate = fs.readFileSync(templatePath + 'entity.js', 'utf8')

          entityTemplate = entityTemplate
            .replace(/__SCHEMA_NAME__/g, IO.toProperCase(collectionName) + 'Schema')
            .replace(/__ENTITY_NAME__/g, IO.toProperCase(collectionName) + 'Entity')
            .replace(/__COLLECTION_NAME__/g, collectionName)
            .replace(/__FIELDS_LIST__/g, JSON.stringify(fieldsList, null, 2))
            .replace(/"===/g, '')
            .replace(/==="/g, '')

          fs.writeFileSync(this.root + '/core/entity/' + collectionName + '.js', entityTemplate, 'utf8')
          callback(null)
        } catch (err) {
          callback(err)
        }
      })
    }
  })
}

exports.generateUseCase = (collectionName, callback) => {
  try {
    let usecaseTemplate = fs.readFileSync(templatePath + 'use_case.js', 'utf8')

    usecaseTemplate = usecaseTemplate
      .replace(/___COLLECTION_NAME___/g, collectionName)
      .replace(/___ID___/g, '_id')
      .replace(/___DATA___/g, collectionName + 'Data')

    fs.writeFileSync(this.root + '/core/use_case/' + collectionName + '.js', usecaseTemplate, 'utf8')
    callback(null)
  } catch (err) {
    callback(err)
  }
}

exports.generateDataProvider = (db, collectionName, callback) => {
  try {
    db.collection(collectionName).aggregate([{ $limit: 1 }], (err, data) => {
      if (err) {
        callback(err)
      } else {
        data.toArray((err, docs) => {
          let doc = docs[0]

          let keys = _.allKeys(doc),
            values = _.values(doc)

          let fieldsList = {}
          _.each(keys, (k) => {
            fieldsList[k] = myType.get(values[k])
          })

          // Start generate
          let dvTemplate = fs.readFileSync(templatePath + 'data_provider.js', 'utf8')
          let insertItem = {},
            updateItem = {}
          let checkingItem = ''
          let checkingTemplate =
            "___COLLECTION_NAME___.___FIELD_NAME___ = ((___COLLECTION_NAME___.___FIELD_NAME___ == '' || ___COLLECTION_NAME___.___FIELD_NAME___ == undefined) ? result[0].___FIELD_NAME___ : ___COLLECTION_NAME___.___FIELD_NAME___);\n"

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
            .replace(/___ENTITY_NAME___/g, IO.toProperCase(collectionName) + 'Entity')
            .replace(/___ID___/g, '_id')
            .replace(/___INSERT_ITEM___/g, JSON.stringify(insertItem, null, 2))
            .replace(/___UPDATE_ITEM___/g, JSON.stringify(updateItem, null, 2))
            .replace(/===,"/g, '')
            .replace(/"===/g, '')
            .replace(/___CHECKING_STEP___/g, checkingItem)

          fs.writeFileSync(this.root + '/data_provider/' + collectionName + '.js', dvTemplate, 'utf8')
          callback(null)
        })
      }
    })
  } catch (err) {
    callback(err)
  }
}

exports.generateRoute = (collectionName, callback) => {
  try {
    let routeTemplate = fs.readFileSync(templatePath + 'route.js', 'utf8')

    routeTemplate = routeTemplate.replace(/___COLLECTION_NAME___/g, collectionName).replace(/___ID___/g, '_id')

    fs.writeFileSync(this.root + '/routes/' + collectionName + '.js', routeTemplate, 'utf8')
    callback(null)
  } catch (err) {
    callback(err)
  }
}
