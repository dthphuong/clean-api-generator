/**
 * configType = 0 is Development environment
 * configType = 1 is Production environment
 */
var home = require("os").homedir();
var configType = 0;

switch (configType) {
    case 0: // Development environment
        exports.server = {
            port: 3000,
            secret: '###FPO-secret###',
            exptime: '604800',
            base_url: 'http://localhost/',
            limiterMaxTime: 1 * 60 * 1000,
            limiterMaxRequestNormal: 100,
            limiterMaxRequestMedium: 10,
            limiterMaxRequestHard: 1,
            noTokenUrls: [
                '/', '/oauth',
            ],
            maxDuration: 10000 // ms
        }
        exports.database = {
            host: 'HOST',
            port: PORT,
            name: 'DBNAME',
            username: 'USERNAME',
            password: 'PASSWORD',
            optional: 'OPTIONAL'
        }
        exports.ffmpegPath = home + "/usr/bin/ffmpeg";
        exports.ffprobePath = home + "/usr/bin/ffprobe";
        exports.tempPhotoPath = home + "/upload/";
        exports.apiPath = "/home/youth-app-api/";
        exports.webPath = "/var/www/html/asset/";
        exports.assetWebPath = "/var/www/html/asset/";
        exports.thumbWebPath = "/var/www/html/thumbs/";
        exports.defaultAvatar = "layout/images/user.png";
        break;
    case 1: // Production environment
        exports.server = {
            port: 8080,
            secret: '###FPO-secret###',
            exptime: '604800',
            base_url: 'http://fpo.vn/',
            limiterMaxTime: 1 * 60 * 1000,
            limiterMaxRequestNormal: 100,
            limiterMaxRequestMedium: 10,
            limiterMaxRequestHard: 1,
            noTokenUrls: [
                '/', '/oauth',
            ],
            maxDuration: 10000 // ms
        }
        exports.database = {
            host: 'HOST',
            port: PORT,
            name: 'DBNAME',
            username: 'USERNAME',
            password: 'PASSWORD',
            optional: 'OPTIONAL'
        }
        exports.ffmpegPath = home + "/usr/bin/ffmpeg";
        exports.ffprobePath = home + "/usr/bin/ffprobe";
        exports.tempPhotoPath = home + "/upload/";
        exports.apiPath = "/home/youth-app-api/";
        exports.webPath = "/var/www/html/asset/";
        exports.assetWebPath = "/var/www/html/asset/";
        exports.thumbWebPath = "/var/www/html/thumbs/";
        exports.defaultAvatar = "layout/images/user.png";
        break;
}