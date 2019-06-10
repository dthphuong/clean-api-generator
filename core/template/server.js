/**
 * Created by Phuong Duong on 24/09/2018
 */
"use strict";
global._ = require("underscore");
global.config = require("./config");
var express = require("express"),
  bodyParser = require("body-parser"),
  util = require('./util'),
  jwt = require("./util/JWT"),
  limiter = require('./util/Limiter'),
  fs = require('fs');
var app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server);

var routes = require("./routes");

var clientList = []

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
        fs.writeFileSync('./logs/attendance.csv', util.DateTime.toISODateString(new Date()) + ',' + '[WARN]' + ',' + 'Middleware' + ',' + decoded.exitcode + ',' + decoded.error + '\n', {
          flag: "a"
        })
        return res.json({
          exitcode: decoded.exitcode,
          data: '',
          message: decoded.error
        });
      } else {
        req.payload = decoded;

        // Check if no socket client connect
        if (req.originalUrl == '/sendParticipantInfo') {
          if (clientList.length == 0) {
            fs.writeFileSync('./logs/attendance.csv', util.DateTime.toISODateString(new Date()) + ',' + '[ERROR]' + ',' + '/sendParticipantInfo' + ',' + util.ErrorHandle.getErrorCode(5) + ',' + util.ErrorHandle.getErrorMessage(5) + '\n', {
              flag: "a"
            })
            return res.send({
              exitcode: util.ErrorHandle.getErrorCode(5),
              data: {},
              message: util.ErrorHandle.getErrorMessage(5)
            })
          }
        }

        next();
      }
    } else {
      fs.writeFileSync('./logs/attendance.csv', util.DateTime.toISODateString(new Date()) + ',' + '[ERROR]' + ',' + 'Middleware' + ',' + 0 + ',' + 'No token provided' + ',' + '\n', {
        flag: "a"
      })
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

// Assign API routes
routes.assignAPIRoutes(app);
server.listen(config.server.port, function () {
  console.log("Server is listening on port  %s...", config.server.port)
});

// ==================Realtime events==================
var UserDataProvider = require('./data_provider/user'),
  AttendanceDataProvider = require('./data_provider/attendance');
io.on('connection', function (socket) {
  console.log('@ New client connection:', socket.id)
  clientList.push(socket.id)

  // Realtime api
  app.post('/sendParticipantInfo', (req, res, next) => {
    var data = {
      eventId: req.body.eventId,
      participantId: req.body.participantId,
      userId: req.payload.data._id
    }
    UserDataProvider.sendParticipantInfo(data.participantId, data.eventId, (err, resultInfo) => {
      if (err) {
        let message = ''

        switch (err) {
          case 2:
            message = 'Người tham dự chưa được thêm vào sự kiện này hoặc Sự kiện đã kết thúc hoặc chưa bắt đầu'
            break;
          case 3:
            message = 'Người tham dự không tồn tại trong hệ thống.'
            break;
          default:
            message = 'Lỗi: ' + err
            break;
        }
        fs.writeFileSync('./logs/attendance.csv', util.DateTime.toISODateString(new Date()) + ',' + '[ERROR]' + ',' + '/sendParticipantInfo' + ',' + util.ErrorHandle.getErrorCode(err) + ',' + util.ErrorHandle.getErrorMessage(err) + ',' + err + '\n', {
          flag: "a"
        })
        return res.send({
          exitcode: util.ErrorHandle.getErrorCode(err),
          data: {},
          message: message
        })
      } else {
        resultInfo.userId = data.userId

        // send to all clients
        _.each(clientList, (client) => {
          console.log('--> Emit to: ' + client + '---------------');
          io.sockets.to(client).emit(data.eventId, JSON.stringify(resultInfo))
          console.log('#END Emit----------------------');
        })

        // create Attendance
        AttendanceDataProvider.getTimeOut(data.participantId, function (err, duration) {
          if (err) {
            fs.writeFileSync('./logs/attendance.csv', util.DateTime.toISODateString(new Date()) + ',' + '[ERROR]' + ',' + '/attendance/getTimeOut' + ',' + util.ErrorHandle.getErrorCode(err) + ',' + util.ErrorHandle.getErrorMessage(err) + ',' + err + '\n', {
              flag: "a"
            })
            return res.send({
              exitcode: util.ErrorHandle.getErrorCode(err),
              data: {},
              message: util.ErrorHandle.getErrorMessage(err) + ': ' + err
            })
          } else {
            fs.writeFileSync('./logs/attendance.csv', util.DateTime.toISODateString(new Date()) + ',' + '[INFO]' + ',' + '/attendance/getTimeOut' + ',' + 1 + ',' + 'Successful' + '\n', {
              flag: "a"
            })
            if (duration > config.server.maxDuration || duration == 0) {
              AttendanceDataProvider.create(data, function (err, result) {
                if (err) {
                  fs.writeFileSync('./logs/attendance.csv', util.DateTime.toISODateString(new Date()) + ',' + '[ERROR]' + ',' + '/attendance/create' + ',' + util.ErrorHandle.getErrorCode(err) + ',' + util.ErrorHandle.getErrorMessage(err) + ',' + err + '\n', {
                    flag: "a"
                  })
                  return res.send({
                    exitcode: util.ErrorHandle.getErrorCode(err),
                    data: {},
                    message: util.ErrorHandle.getErrorMessage(err) + ': ' + err
                  })
                } else {
                  fs.writeFileSync('./logs/attendance.csv', util.DateTime.toISODateString(new Date()) + ',' + '[INFO]' + ',' + '/attendance/create' + ',' + 1 + ',' + 'Successful' + '\n', {
                    flag: "a"
                  })
                  return res.send({
                    exitcode: 1,
                    data: resultInfo,
                    message: 'Điểm danh thành công'
                  })
                }
              })
            } else {
              return res.send({
                exitcode: 1,
                data: {},
                message: 'Điểm danh quá nhanh'
              })
            }
          }
        })
      }
    })
  });

  socket.on('disconnect', function () {
    // remove clientId in clientList
    clientList = _.reject(clientList, (client) => {
      return client == socket.id
    })
    console.log('# Client ' + socket.id + ' disconnect');
    console.log('# nClient(s) = ' + clientList.length);
  });
})