var jwt = require("../utils/JWT");

exports.authorized = function (req, res, next) {
    var token = req.body.token || req.headers["x-access-token"];

    if (token) {
        var decoded = jwt.decode(token);

        if (decoded.exitcode != 1) {
            //fail
            return res.json({
                exitcode: decoded.exitcode,
                data: '',
                message: decoded.error
            });
        } else {
            req.payload = decoded;
            next();
        }
    } else {
        return res.status(403).send({
            exitcode: 0,
            data: '',
            message: "No token provided."
        });
    }
}