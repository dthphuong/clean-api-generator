var jwt = require("../utils/JWT");

// Authorization with Access Token and Refresh Token
exports.authorized = function (req, res, next) {
    // console.log(req.rateLimit); // logging count limit

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
            req.body._currentUser = decoded.data._id
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

// Parse some parameters for QueryBuilder
exports.parametersParser = function (req, res, next) {
    var data = { ...req.query, ...req.body }
    if (_.isUndefined(data.cols) || data.cols == '') {
        data.cols = config.CONST.DEFAULT_SEARCH_COLUMN;
        data.q = '';
    } else {
        data.cols = data.cols.trim();
        data.q = _.isUndefined(data.q) ? '' : data.q;
    }
    data.sBy = (_.isUndefined(data.sBy) || data.sBy == '') ? config.CONST.DEFAULT_SORT_COLUMN : data.sBy.trim();
    data.sType = (_.isUndefined(data.sType) || data.type == '') ? config.CONST.DEFAULT_SORT_TYPE : data.sType.trim();
    data.page = (_.isUndefined(data.page) || data.page == '') ? config.CONST.DEFAULT_PAGE_INDEX : parseInt(data.page);
    data.limit = (_.isUndefined(data.limit) || data.limit == '') ? config.CONST.DEFAULT_PAGE_LIMIT : parseInt(data.limit);

    data.nSkip = (data.page - 1) * data.limit;
    data.nLimit = data.limit;

    req.myParams = data;
    next();
}