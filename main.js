/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const utils = require('./utils')
const fs = require('fs')
const path = require('path')

const core = require('./core')
const async = require('async')
const chalk = require('chalk')
const figlet = require('figlet')

//#region _____DEFAULT_VARIABLE_____

const success = chalk.bold.green
const info = chalk.italic.bold.blue
const error = chalk.bold.red
const announce = chalk.bold.bgCyan.white

var inputData = {
  // project variables
  name: 'cool-clean-api-project',
  version: '1.0.0',
  description: 'This is COOL project which made by CleanAPI framework from FPO Co.,Ltd',
  main: 'server.js',
  repo: '',
  keywords: ['fpo', 'api', 'framework', 'clean'],
  author: 'FPO Co.,Ltd',
  license: 'MIT',
  output: './',

  // database variables
  host: 'localhost',
  port: '27017',
  dbName: 'demo',
  username: '',
  password: '',
  collation: 'vi',
}
var root = ''

//#endregion

async.series(
  [
    //#region _____GET_PROJECT_AND_DATABASE_INFO_____
    (callback) => {
      console.clear()

      console.log(
        figlet.textSync('CleanAPI Generator v2.0', {
          kerning: 'full',
        })
      )

      console.log(
        info('The powerful and flexible API framework which is used Node.JS, Express and based-on Clean architecture')
      )
      console.log(info('Developed by Phuong Duong - FPO Co.,Ltd'))
      console.log(info('Email: phuongduong@fpo.vn'))
      console.log(info('\n'))
      console.log(info('Press Ctrl + C at any time to quit.\n'))

      callback()
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
      var exitcode = 0
      console.log(announce('\n__________________________________________________________________'))
      console.log(announce('____________________Generate project structure____________________'))
      console.log(announce('__________________________________________________________________'))

      root = path.join(inputData.output, inputData.name)
      if (!fs.existsSync(root)) {
        console.log(error('⚠️  Folder [' + root + '] does not exist.'))
        fs.mkdirSync(root)
        console.log(success('✅ Created [' + root + ' ] folder'))

        // Generate project structure
        exitcode = core.generateProjectStructure(root, inputData)
      } else {
        console.log(success('✅ Folder [' + root + '] exist!!!'))

        // Check empty project folder
        if (fs.readdirSync(root).length > 0) {
          console.log(error('❌ Folder [' + root + '] is not empty. Please try again !'))
          exitcode = 1
        } else {
          console.log(success('✅ Folder [' + root + '] is empty!!!'))

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
      console.log(announce('\n__________________________________________________________________'))
      console.log(announce('_______________Generate core files based on Database______________'))
      console.log(announce('__________________________________________________________________'))

      root = path.join(inputData.output, inputData.name)

      // eslint-disable-next-line no-unused-vars
      core.generateKernelFiles(root, inputData, function (err, data) {
        if (err) {
          console.log(error('❌  ' + utils.ErrorHandle.getErrorMessage(err)))
          callback(1)
        } else {
          console.log(success('\n✅ Generate Kernel files successfully !!!'))
          callback()
        }
      })
    },
    //#endregion
    //#region _____FINALIZE_GENERATE_PROCESS_____
    (callback) => {
      console.log(announce('\n__________________________________________________________________'))
      console.log(announce('_____________________Finalize generate process____________________'))
      console.log(announce('__________________________________________________________________'))

      console.log(info('🗃  Your project structure in `' + root + '`'))
      console.log('|___core')
      console.log('|   |___entity')
      console.log('|   |___use_case')
      console.log('|___data_provider')
      console.log('|___logs')
      console.log('|___routes')
      console.log('|___utils')
      console.log('|   .env.example')
      console.log('|   .eslintrc.json')
      console.log('|   .gitignore')
      console.log('|   .prettierrc.json')
      console.log('|   package.json')
      console.log('|   README.md')
      console.log('|   server.js')

      console.log(info("\n🚀  Let's run the following command to begin: "))
      console.log(success('   🎯 cd ' + root))
      console.log(success('   🎯 yarn install'))
      console.log(success('   🎯 node server.js'))

      callback()
    },
    //#endregion
  ],
  (exitcode) => {
    process.exit(exitcode)
  }
)
