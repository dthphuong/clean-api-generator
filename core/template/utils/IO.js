/* eslint-disable no-unused-vars */
/**
 * Created by FPO Co.,Ltd - Sep 2021
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

//#region Get file name
exports.getFilename = (filename) => {
  let ext =
    ('.' + filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)).toLowerCase() == '.'
      ? '.png'
      : ('.' + filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)).toLowerCase()
  return filename.replace(ext, '')
}
//#endregion

//#region Get ext of file name
exports.getExt = (filename) => {
  return ('.' + filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)).toLowerCase() == '.'
    ? '.png'
    : ('.' + filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)).toLowerCase()
}
//#endregion

//#region Upper Title case
exports.toProperCase = (str) => {
  return str.replace(/(^|[\s\xA0])[^\s\xA0]/g, function (txt) {
    return txt.toUpperCase()
  })
}

exports.toProperCase2 = (str) => {
  return str.replace(/(^|[\s\xA0])[^\s\xA0]/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
//#endregion

//#region Find the Longest Common Substring
exports.longestCommonSubstring = (str1, str2) => {
  if (!str1 || !str2) {
    return {
      length: 0,
      sequence: '',
      offset: 0,
    }
  }

  let sequence = ''
  let str1Length = str1.length
  let str2Length = str2.length
  let num = new Array(str1Length)
  let maxlen = 0
  let lastSubsBegin = 0

  for (let i = 0; i < str1Length; i++) {
    let subArray = new Array(str2Length)
    for (let j = 0; j < str2Length; j++) {
      subArray[j] = 0
    }
    num[i] = subArray
  }
  let thisSubsBegin = null
  for (let i = 0; i < str1Length; i++) {
    for (let j = 0; j < str2Length; j++) {
      if (str1[i] !== str2[j]) {
        num[i][j] = 0
      } else {
        if (i === 0 || j === 0) {
          num[i][j] = 1
        } else {
          num[i][j] = 1 + num[i - 1][j - 1]
        }

        if (num[i][j] > maxlen) {
          maxlen = num[i][j]
          thisSubsBegin = i - num[i][j] + 1
          if (lastSubsBegin === thisSubsBegin) {
            // if the current LCS is the same as the last time this block ran
            sequence += str1[i]
          } else {
            // this block resets the string builder if a different LCS is found
            lastSubsBegin = thisSubsBegin
            sequence = '' // clear it
            sequence += str1.substr(lastSubsBegin, i + 1 - lastSubsBegin)
          }
        }
      }
    }
  }

  return {
    length: maxlen,
    sequence: sequence,
    offset: thisSubsBegin,
  }
}
//#endregion

exports.execute = async (commands1, commands2) => {
  await exec(commands1, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
    } else {
      console.log(stdout, stderr)
    }
  })
  await exec(commands2, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
    } else {
      console.log(stdout, stderr)
    }
  })
}
