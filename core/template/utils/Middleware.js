const jwt = require('../utils/JWT')

// Authorization with Access Token and Refresh Token
exports.authorized = (req, res, next) => {
  // console.log(req.rateLimit); // logging count limit

  const token = req.body.token || req.headers['x-access-token']
  if (token) {
    const decoded = jwt.decodeAccessToken(token)

    if (decoded.exitcode != 1) {
      //fail
      return res.json({
        exitcode: decoded.exitcode,
        data: '',
        message: decoded.error,
      })
    } else {
      req.payload = decoded
      req.body._currentUser = decoded.data._id
      next()
    }
  } else {
    return res.status(403).send({
      exitcode: 0,
      data: '',
      message: 'No token provided.',
    })
  }
}

// Parse some parameters for QueryBuilder
exports.parametersParser = (req, res, next) => {
  const data = { ...req.query, ...req.body }
  if (!data.cols || data.cols == '') {
    data.cols = process.env.DEFAULT_SEARCH_COLUMN
    data.q = ''
  } else {
    data.cols = data.cols.trim()
    data.q = !data.q ? '' : data.q
  }
  data.sBy = !data.sBy || data.sBy == '' ? process.env.DEFAULT_SORT_COLUMN : data.sBy.trim()
  data.sType = !data.sType || data.type == '' ? process.env.DEFAULT_SORT_TYPE : data.sType.trim()
  data.page = !data.page || data.page == '' ? process.env.DEFAULT_PAGE_INDEX : parseInt(data.page)
  data.limit = !data.limit || data.limit == '' ? process.env.DEFAULT_PAGE_LIMIT : parseInt(data.limit)

  data.nSkip = (data.page - 1) * data.limit
  data.nLimit = data.limit

  req.myParams = data
  next()
}
