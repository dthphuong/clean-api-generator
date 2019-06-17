/**
 * Created by FPO Co.,Ltd - June 2019
 * Website: http://fpo.vn
 * Email: contact@fpo.vn
 */
"use strict";

global.config = require("./config");
global._ = require("underscore");
var express = require("express"),
  bodyParser = require("body-parser"),
  util = require('./utils'),
  jwt = require("./utils/JWT"),
  limiter = require('./utils/Limiter'),
  fs = require('fs');
var app = express();

//#region Middleware

app.use(limiter.generalLimiter); // apply to all api
app.use('/oauth', limiter.mediumLimiter); // apply to oauth, decode,. . . api
app.use('/system/decode', limiter.mediumLimiter); // apply to oauth, decode,. . . api

app.use(bodyParser.json({
  limit: "5000mb"
}));
app.use(bodyParser.urlencoded({
  limit: "5000mb",
  extended: true
}));

app.use(function (req, res, next) {
  console.log(req.rateLimit); // logging count limit

  if (_.indexOf(config.server.noTokenUrls, req.originalUrl) == -1) {
    // do not need a TOKEN
    var token = req.body.token || req.headers["x-access-token"];

    if (token) {
      var decoded = jwt.decode(token);

      if (decoded.exitcode != 1) {
        //fail
        return res.json({
          exitcode: decoded.exitcode,
          data: '',
          message: decoded.error
        });
      } else {
        req.payload = decoded;
        next();
      }
    } else {
      return res.status(403).send({
        exitcode: 0,
        data: '',
        message: "No token provided."
      });
    }
  } else {
    next();
  }
});

//#endregion

var routes = require("./routes");
routes.assignAPIRoutes(app);

app.listen(config.server.port);
console.log("Server is listening on port " + config.server.port);