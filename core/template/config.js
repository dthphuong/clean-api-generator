/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
/**
 * configType = 0 is Development environment
 * configType = 1 is Production environment
 */
var home = require('os').homedir()
var configType = 0
var path = require('path')

switch (configType) {
  case 0: // Development environment
    exports.ENV = 'DEVELOPMENT'
    exports.LogTemplate =
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status : :res[content-length] :response-time[3]ms ":referrer" ":user-agent"'

    exports.server = {
      port: 3000,
      accessTokenSecretKey: 'access-secet-key',
      accessTokenExpiryTime: 10000000, // 1-minute
      refreshTokenSecretKey: 'refresh-secet-key',
      refreshTokenExpiryTime: 2592000, // 1-month
      base_url: 'http://localhost',
      limiterMaxTime: 1 * 60 * 1000,
      limiterMaxRequestNormal: 100,
      limiterMaxRequestMedium: 10,
      limiterMaxRequestHard: 1,
      maxDuration: 10000, // ms
    }
    exports.database = {
      host: 'HOST',
      port: PORT,
      name: 'DBNAME',
      username: 'USERNAME',
      password: 'PASSWORD',
      optional: 'OPTIONAL',
    }
    exports.CONST = {
      DEFAULT_SEARCH_COLUMN: '_id',
      DEFAULT_SORT_COLUMN: '_id',
      DEFAULT_SORT_TYPE: 'ASC',
      DEFAULT_PAGE_INDEX: 1,
      DEFAULT_PAGE_LIMIT: 10,
    }

    exports.maxFileSize = 20971520 // 20 MB
    exports.stdThumbSize = 500 // pixel
    exports.stdPhotoSize = 1280 // pixel
    exports.stdPhotoQuality = 80 // %
    exports.storageUrl = 'https://fpo.vn/'
    exports.tempPath = path.dirname(__dirname) + '/upload/'
    exports.filePath = path.dirname(__dirname) + '/upload/files/'
    exports.assetPath = path.dirname(__dirname) + '/upload/assets'
    exports.thumbPath = path.dirname(__dirname) + '/upload/thumbs'
    exports.defaultAvatar = 'layout/images/user.png'
    break
  case 1: // Production environment
    exports.ENV = 'PRODUCTION'
    exports.LogTemplate =
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status : :res[content-length] :response-time[3]ms ":referrer" ":user-agent"'

    exports.server = {
      port: 8080,
      accessTokenSecretKey: 'access-secet-key',
      accessTokenExpiryTime: 60, // 1-minute
      refreshTokenSecretKey: 'refresh-secet-key',
      refreshTokenExpiryTime: 2592000, // 1-month
      base_url: 'https://fpo.vn',
      limiterMaxTime: 1 * 60 * 1000,
      limiterMaxRequestNormal: 100,
      limiterMaxRequestMedium: 10,
      limiterMaxRequestHard: 1,
      maxDuration: 10000, // ms
    }
    exports.database = {
      host: 'HOST',
      port: PORT,
      name: 'DBNAME',
      username: 'USERNAME',
      password: 'PASSWORD',
      optional: 'OPTIONAL',
    }
    exports.CONST = {
      DEFAULT_SEARCH_COLUMN: '_id',
      DEFAULT_SORT_COLUMN: '_id',
      DEFAULT_SORT_TYPE: 'ASC',
      DEFAULT_PAGE_INDEX: 1,
      DEFAULT_PAGE_LIMIT: 10,
    }

    exports.maxFileSize = 20971520 // 20 MB
    exports.stdThumbSize = 500 // pixel
    exports.stdPhotoSize = 1280 // pixel
    exports.stdPhotoQuality = 80 // %
    exports.storageUrl = 'https://fpo.vn/'
    exports.tempPath = path.dirname(__dirname) + '/upload/'
    exports.filePath = path.dirname(__dirname) + '/upload/files/'
    exports.assetPath = path.dirname(__dirname) + '/upload/assets'
    exports.thumbPath = path.dirname(__dirname) + '/upload/thumbs'
    exports.defaultAvatar = 'layout/images/user.png'
    break
}
