/**
 * Created by Phuong Duong on 07/02/2018
 */
var accountRoute = require('./account')
    idiomRoute = require('./idiom')
    

exports.assignRoutes = function(app) {
    app.get('/', (req, res) => {
        return res.send('Hello world ! Welcome to Clean architecture for Node.JS project')
    });

    //#region Account route
    app.post('/account/checkUid', accountRoute.checkUid);
    app.post('/account/oauth2', accountRoute.oauth2);
    //#endregion

    //#region Idiom route
    app.get('/idiom/getAll', idiomRoute.getAll);
    app.get('/idiom/getAllABC', idiomRoute.getAllABC);
    app.get('/idiom/getRandom', idiomRoute.getRandom);
    //#endregion
}