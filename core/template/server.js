/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
 'use strict'

 require('dotenv').config()
 const fs = require('fs')
 const path = require('path')
 const express = require('express')
 const cors = require('cors')
 const morgan = require('morgan')

 const Middleware = require('./utils/Middleware')
 const limiter = require('./utils/Limiter')

 const app = express()

 //#region Middleware
 app.use(cors())
 app.use(
   express.json({
     limit: '500mb',
   })
 )
 app.use(
   express.urlencoded({
     limit: '500mb',
     extended: true,
   })
 )
 app.use(limiter.generalLimiter) // apply to all api
 app.use(Middleware.parametersParser) // parse parameters in Query before processing
 app.use('/oauth', limiter.mediumLimiter) // apply to oauth, decode,. . . api
 app.use('/system/decode', limiter.mediumLimiter) // apply to oauth, decode,. . . api

 const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
 app.use(morgan(process.env.LOG_TEMPLATE, { stream: accessLogStream }))

 //#endregion

 let routes = require('./routes')
 routes.assignAPIRoutes(app)

 app.listen(process.env.PORT)
 console.log(`🎉 Server is listening on port ${process.env.PORT}`)
 console.log(`👉 Please access this URL to get started: ${process.env.BASE_URL}:${process.env.PORT}`)
