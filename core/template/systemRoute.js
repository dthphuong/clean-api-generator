/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
 const jwt = require('../utils/JWT')

 exports.decode = function (req, res) {
   return res.send(req.payload)
 }

 exports.oauth = function (req, res) {
   return res.send({
     exitcode: 1,
     data: jwt.encodeAccessToken(
       {
         data: 'Your data is JSON Object or JSON Array',
         message: 'This is your data',
       },
       process.env.ACCESS_TOKEN_EXPIRED_TIME
     ),
     message: 'Generate JWT successful',
   })
 }
