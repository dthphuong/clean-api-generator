/**
 * Created by Phuong Duong on 07/02/2018
 * configType = 0 is Development environment
 * configType = 1 is Production environment
 */

var home = require("os").homedir();
var configType = 0;

switch (configType) {
    case 0: // Development environment
        exports.server = {
            port: 3000,
            secret: '###FPO@secretJwT###',
            exptime: '3600',
            base_url: 'http://base.url',
            limiterMaxTime: 1 * 60 * 1000,
            limiterMaxRequestNormal: 100,
            limiterMaxRequestMedium: 10,
            limiterMaxRequestHard: 1,
            noTokenUrls: ['/account/checkUid', '/account/oauth2', '/idiom/getAll']
        }

        exports.database = {
            host: 'localhost',
            port: 27017,
            name: 'demo',
            username: '',
            password: '',
            optional: ''
        }

        exports.email = {
            'resetUrl': 'http://base.url/reset-password?token=',
            'emailAddress': 'reset@e.mail',
            'emailPassword': 'password',
            'smtpPort': 587,
            'smtpHost': 'smtp.yandex.com'
        }

        exports.ffmpegPath = home + "/usr/bin/ffmpeg";
        exports.ffprobePath = home + "/usr/bin/ffprobe";
        exports.tempPhotoPath = home + "/upload/";
        exports.defaultAvatar = "layout/images/user.png"
        break;
    case 1: // Production environment
        exports.server = {
            port: 3000,
            secret: '###FPO@secretJwT###',
            exptime: '3600',
            base_url: 'http://base.url',
            limiterMaxTime: 1 * 60 * 1000,
            limiterMaxRequestNormal: 100,
            limiterMaxRequestMedium: 10,
            limiterMaxRequestHard: 1,
            noTokenUrls: ['/account/checkUid', '/account/oauth2', '/idiom/getAll']
        }

        exports.database = {
            host: 'localhost',
            port: 27017,
            name: 'demo',
            username: '',
            password: '',
            optional: ''
        }

        exports.email = {
            'resetUrl': 'http://base.url/reset-password?token=',
            'emailAddress': 'reset@e.mail',
            'emailPassword': 'password',
            'smtpPort': 587,
            'smtpHost': 'smtp.yandex.com'
        }

        exports.ffmpegPath = home + "/usr/bin/ffmpeg";
        exports.ffprobePath = home + "/usr/bin/ffprobe";
        exports.tempPhotoPath = home + "/upload/";
        exports.defaultAvatar = "layout/images/user.png"
}