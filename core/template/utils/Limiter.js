/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const rateLimit = require('express-rate-limit')

const resMessage = {
  exitcode: 905,
  data: {},
  message: 'Limit exceeded requests, please try again later',
}

exports.generalLimiter = rateLimit({
  windowMs: process.env.LIMITER_MAX_TIME, // 1 minutes
  max: process.env.LIMITER_MAX_REQUEST_NORMAL, // limit each IP to 100 requests per windowMs
  skipFailedRequests: true, // when set to true, failed requests won't be counted
  message: resMessage,
  onLimitReached: (req) => {
    console.log(req.rateLimit) // logging count limit
  },
})

exports.mediumLimiter = rateLimit({
  windowMs: process.env.LIMITER_MAX_TIME, // 1 minutes
  max: process.env.LIMITER_MAX_REQUEST_MEDIUM, // limit each IP to 10 requests per windowMs
  skipFailedRequests: true, // when set to true, failed requests won't be counted
  message: resMessage,
  onLimitReached: (req) => {
    console.log(req.rateLimit) // logging count limit
  },
})

exports.hardLimiter = rateLimit({
  windowMs: process.env.LIMITER_MAX_TIME, // 1 minutes
  max: process.env.LIMITER_MAX_REQUEST_HARD, // limit each IP to 10 requests per windowMs
  skipFailedRequests: true, // when set to true, failed requests won't be counted
  message: resMessage,
  onLimitReached: (req) => {
    console.log(req.rateLimit) // logging count limit
  },
})
