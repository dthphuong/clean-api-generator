
var [[ROUTES]]

exports.assignAPIRoutes = function (app) {
    app.get('/', (req, res) => {
        return res.send('Hello world ! Welcome to Clean architecture for Node.JS project')
    });

    //#region User route
    [[ROUTESAPI]]
}