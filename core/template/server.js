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
  limiter = require('./utils/Limiter');
var app = express();

//#region Middleware

app.use(limiter.generalLimiter); // apply to all api
app.use('/oauth', limiter.mediumLimiter); // apply to oauth, decode,. . . api
app.use('/system/decode', limiter.mediumLimiter); // apply to oauth, decode,. . . api

app.use(bodyParser.json({
  limit: "500mb"
}));
app.use(bodyParser.urlencoded({
  limit: "500mb",
  extended: true
}));

//#endregion

var routes = require("./routes");
routes.assignAPIRoutes(app);

app.listen(config.server.port);
console.log("Server is listening on port " + config.server.port);