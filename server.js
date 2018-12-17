/**
 * Created by Phuong Duong on 07/02/2018
 */
'use strict';

global._ = require('underscore');
var express = require('express'),
    bodyParser = require('body-parser'),
    jwt = require('./util/JWT');

var app = express();

//#region Middleware

app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));

app.use(function (req, res, next) {
    if (_.indexOf(config.server.noTokenUrls, req.originalUrl) == -1) { // do not need a TOKEN 
        var token = req.body.token || req.headers['x-access-token'];

        if (token) {
            var decoded = jwt.decode(token)

            if (decoded.status != 1) { //fail
                return res.json({
                    exitcode: 0,
                    message: decoded.error
                })
            } else {
                req.payload = decoded
                next()
            }
        } else {
            return res.status(403).send({
                exitcode: 0,
                message: 'No token provided.'
            })
        }
    } else {
        next();
    }
})

//#endregion

var routes = require('./routes');
routes.assignRoutes(app);

app.listen(config.server.port);
console.log('Server listening on port ' + config.server.port);