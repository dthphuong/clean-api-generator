/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const mongoose = require('mongoose')

exports.Connect = function (dbName = process.env.DB_NAME) {
  let db

  return new Promise(function (resolve, reject) {
    if (db) {
      if (db.name == dbName) {
        resolve(db)
        return
      } else {
        console.log(`💤 Close database [${db.name}]`)
        db.close()
      }
    }
    mongoose.Promise = global.Promise

    // create connection string
    let connectionString = ''
    if (process.env.DB_USERNAME == '' || process.env.PASSWORD == '') {
      connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${dbName}`
    } else {
      connectionString = `mongodb://${process.env.DB_USERNAME}:${process.env.PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${dbName}`
    }

    // connect to database
    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      })
      .then(() => {
        db = mongoose.connection
        console.log(`🎉 New connection created to [${db.name}]`)
        resolve(db)
      })
      .catch((err) => {
        console.log(`❌ Error creating MongoDb connection: ${err}`)
        reject(err)
      })
  })
}
