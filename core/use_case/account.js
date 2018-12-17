/**
 * Created by Phuong Duong on 07/02/2018
 */

var request = require('request');
var DataProvider = require('../../data_provider/account');

exports.checkUid = function(username, cb) {
    request.post({url:config.server.worldUrl + '/childhub/checkUid', form: {username: username}}, 
                    function(err,httpResponse,body){ 
                        if (err) {
                            cb(err, null);
                        } else {
                            cb(null, JSON.parse(body));
                        }
                    });
}