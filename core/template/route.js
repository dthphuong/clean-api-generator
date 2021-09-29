/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
const UseCase = require('../core/use_case/___COLLECTION_NAME___')
const utils = require('../utils')

exports.getAll = (req, res) => {
  req.myParams.payload = req.payload.data

  UseCase.getAll(req.myParams, (err, result) => {
    if (err) {
      return res.send({
        exitcode: utils.ErrorHandle.getErrorCode(err),
        data: [],
        message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err,
      })
    }
    return res.send({
      exitcode: 1,
      data: result,
      message: 'Get all items successful',
    })
  })
}

exports.getById = (req, res) => {
  const { ___ID___ } = req.body

  UseCase.getById(___ID___, function (err, result) {
    if (err) {
      return res.send({
        exitcode: utils.ErrorHandle.getErrorCode(err),
        data: {},
        message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err,
      })
    }
    return res.send({
      exitcode: 1,
      data: result,
      message: 'Get item successful',
    })
  })
}

exports.create = (req, res) => {
  const data = req.body

  UseCase.create(data, function (err, result) {
    if (err) {
      return res.send({
        exitcode: utils.ErrorHandle.getErrorCode(err),
        data: {},
        message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err,
      })
    }
    return res.send({
      exitcode: 1,
      data: {
        _id: result._id,
      },
      message: 'Create item successful',
    })
  })
}

exports.update = (req, res) => {
  const ___COLLECTION_NAME___ = req.body

  UseCase.update(___COLLECTION_NAME___, function (err, result) {
    if (err) {
      return res.send({
        exitcode: utils.ErrorHandle.getErrorCode(err),
        data: {},
        message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err,
      })
    }
    return res.send({
      exitcode: 1,
      data: {
        nModified: result.nModified,
      },
      message: 'Update item successful',
    })
  })
}

exports.delete = (req, res) => {
  const { ___ID___ } = req.body

  UseCase.delete(___ID___, function (err, result) {
    if (err) {
      return res.send({
        exitcode: utils.ErrorHandle.getErrorCode(err),
        data: result,
        message: utils.ErrorHandle.getErrorMessage(err) + ': ' + err,
      })
    }
    return res.send({
      exitcode: 1,
      data: {},
      message: 'Delete item successful',
    })
  })
}
