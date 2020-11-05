var Middleware = require('../utils/Middleware');
var sysRoute = require('./system');
var User = require('./user');
var Idiom = require('./idiom');


exports.assignAPIRoutes = function (app) {
	app.get('/', (req, res) => {
		return res.send('Hello world ! Welcome to Clean architecture for Node.JS project')
	});

	//#region System route
	app.post('/system/decode', sysRoute.decode);
	app.post('/oauth', sysRoute.oauth);
	// app.post('/APIwithToken', Middleware.authorized, sysRoute.oauth);

	//#region User route
	app.get('/user/getAll', Middleware.authorized, User.getAll);
	app.get('/user/getById', Middleware.authorized, User.getById);
	app.post('/user/create', Middleware.authorized, User.create);
	app.put('/user/update', Middleware.authorized, User.update);
	app.delete('/user/delete', Middleware.authorized, User.delete);

	//#region Idiom route
	app.get('/idiom/getAll', Middleware.authorized, Idiom.getAll);
	app.get('/idiom/getById', Middleware.authorized, Idiom.getById);
	app.post('/idiom/create', Middleware.authorized, Idiom.create);
	app.put('/idiom/update', Middleware.authorized, Idiom.update);
	app.delete('/idiom/delete', Middleware.authorized, Idiom.delete);
}