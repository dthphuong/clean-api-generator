/**
 * Created by Phuong Duong on 05/09/2018
 */
'use strict'

// var fs = require('fs');
// const HTML5ToPDF = require('html5-to-pdf');
// const path = require('path');
global._ = require('underscore');
const {
    exec
} = require('child_process');

//#region Get file name
function getFilename(filename) {
    return filename.replace(getExt(filename), '');
}
//#endregion

//#region Get ext of file name
function getExt(filename) {
    return ('.' + filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)).toLowerCase() == '.' ? '.png' : ('.' + filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)).toLowerCase();
}
//#endregion

//#region Copy file from `srcPath` to `savPath` 
function copyFile(srcPath, savPath) {
    var data = fs.readFileSync(srcPath);
    fs.writeFileSync(savPath, data);
}
//#endregion

//#region Move file from `srcPath` to `savPath` 
function moveFile(srcPath, savPath) {
    var data = fs.readFileSync(srcPath);
    fs.writeFileSync(savPath, data);
    fs.unlinkSync(srcPath);
}
//#endregion

//#region Upper Title case
function toProperCase(str) {
    return str.replace(
        /(^|[\s\xA0])[^\s\xA0]/g,
        function (txt) {
            return txt.toUpperCase();
        }
    );
}

function toProperCase2(str) {
    return str.replace(
        /(^|[\s\xA0])[^\s\xA0]/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
//#endregion

//#region Find the Longest Common Substring
function longestCommonSubstring(str1, str2) {
    if (!str1 || !str2) {
        return {
            length: 0,
            sequence: '',
            offset: 0
        }
    }

    var sequence = ''
    var str1Length = str1.length
    var str2Length = str2.length
    var num = new Array(str1Length)
    var maxlen = 0
    var lastSubsBegin = 0

    for (var i = 0; i < str1Length; i++) {
        var subArray = new Array(str2Length)
        for (var j = 0; j < str2Length; j++) {
            subArray[j] = 0
        }
        num[i] = subArray
    }
    var thisSubsBegin = null
    for (i = 0; i < str1Length; i++) {
        for (j = 0; j < str2Length; j++) {
            if (str1[i] !== str2[j]) {
                num[i][j] = 0
            } else {
                if ((i === 0) || (j === 0)) {
                    num[i][j] = 1
                } else {
                    num[i][j] = 1 + num[i - 1][j - 1]
                }

                if (num[i][j] > maxlen) {
                    maxlen = num[i][j]
                    thisSubsBegin = i - num[i][j] + 1
                    if (lastSubsBegin === thisSubsBegin) { // if the current LCS is the same as the last time this block ran
                        sequence += str1[i]
                    } else { // this block resets the string builder if a different LCS is found
                        lastSubsBegin = thisSubsBegin
                        sequence = '' // clear it
                        sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin)
                    }
                }
            }
        }
    }
    return {
        length: maxlen,
        sequence: sequence,
        offset: thisSubsBegin
    }
}
//#endregion

exports.mergeObjects = function (obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }
    return obj3;
}

exports.exportToPDF = async (filename, htmlData) => {
    const html5ToPDF = new HTML5ToPDF({
        inputBody: htmlData,
        outputPath: path.join(__dirname, '..', 'pdf-file', filename),
        // templatePath: path.join(__dirname, "templates", "basic"),
        include: [
            path.join(__dirname, '..', 'email-template', 'css', 'bootstrap.min.css'),
            path.join(__dirname, '..', 'email-template', 'css', 'paper.min.css'),
            path.join(__dirname, '..', 'email-template', 'css', 'paper-custom.css'),
        ],
        launchOptions: {
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
        // launchOptions: { headless: false }
    });

    await html5ToPDF.start().catch(err => console.error(err));
    await html5ToPDF.build().catch(err => console.error(err));
    await html5ToPDF.close().catch(err => console.error(err));
    console.log("DONE: export pdf file");
};

exports.execute = async (commands1) => {
    await exec(commands1, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(stdout, stderr)
        }
    });
}

exports.execute2 = async (commands1, commands2) => {
    await exec(commands1, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(stdout, stderr)
        }
    });
    await exec(commands2, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(stdout, stderr)
        }
    });
}

exports.execute4 = async (commands1, commands2, commands3, commands4) => {
    await exec(commands1, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(stdout, stderr)
        }
    });
    await exec(commands2, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(stdout, stderr)
        }
    });
    await exec(commands3, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(stdout, stderr)
        }
    });
    await exec(commands4, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        } else {
            console.log(stdout, stderr)
        }
    });
}


function isJSON(json) {
    json = JSON.stringify(json)
    if (/^[\],:{}\s]*$/.test(json.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        return true;
    }
    return false;
}

exports.mongoTypeOf = function mongoTypeOf(value) {
    switch (typeof value) {
        case 'number':
            return 'Number'
        case 'string':
            return 'String'
        case 'object':
            if (_.isDate(value)) {
                return 'Date'
            }
            if (value.toString().length == 24) {
                return 'ObjectId'
            }
            if (isJSON(value)) {
                return 'JSON'
            }

            return 'object'
        case 'boolean':
            return 'Boolean'
        default:
            return typeof value
    }
}


exports.getFilename = getFilename;
exports.getExt = getExt;
exports.copyFile = copyFile;
exports.moveFile = moveFile;
exports.toProperCase = toProperCase;
exports.toProperCase2 = toProperCase2;
exports.longestCommonSubstring = longestCommonSubstring;