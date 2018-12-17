/**
 * Created by Phuong Duong on 07/02/2018
 * configType = 0 is Development environment
 * configType = 1 is Production environment
 */

var configType = 0;

switch (configType) {
    case 0: // Development environment
        exports.server = {
            port: 3000,
            secret: '###FPO@secretJwT###',
            exptime: '3600',
            worldUrl: 'http://202.78.227.73:2016',
            noTokenUrls: ['/account/checkUid', '/account/oauth2', '/idiom/getAll']
        }

        exports.database = {
            host: 'localhost',
            port: 27017,
            name: 'childhub',
            username: '',
            password: ''
        }
        break;
    case 1: // Production environment
        exports.server = {
            port: 3000,
            secret: '###FPO@secretJwT###',
            exptime: '604800',
            worldUrl: 'http://202.78.227.73:2016'
        }

        exports.database = {
            host: 'localhost',
            port: 27017,
            name: 'childhub',
            username: '',
            password: ''
        }
        break;
}