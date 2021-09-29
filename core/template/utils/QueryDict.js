/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

// const utils = require('./index')

exports.GetTotalItems = [{ $count: 'total' }]

exports.LimitOffset = (nSkip, nLimit) => {
  if (nSkip < 0 || nLimit < 0) {
    return [
      {
        $skip: 0,
      },
    ]
  } else {
    return [
      {
        $skip: nSkip,
      },
      {
        $limit: nLimit,
      },
    ]
  }
}

exports.PaginateBy = (nLimit) => {
  return [
    {
      $project: {
        nItems: {
          $arrayElemAt: ['$allData.total', 0],
        },
        nPages: {
          $add: [
            {
              $floor: {
                $divide: [
                  {
                    $arrayElemAt: ['$allData.total', 0],
                  },
                  nLimit,
                ],
              },
            },
            {
              $min: [
                1,
                {
                  $mod: [
                    {
                      $arrayElemAt: ['$allData.total', 0],
                    },
                    nLimit,
                  ],
                },
              ],
            },
          ],
        },
        data: '$dataWithLimit',
      },
    },
  ]
}
