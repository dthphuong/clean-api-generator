/**
 * Created by Phuong Duong on 08/06/2019
 */

exports.data = require('./data')

function generatePackageJSON(root, projectInfo) {
    var data = {
        "name": projectInfo.name,
        "version": projectInfo.version,
        "description": projectInfo.description,
        "main": projectInfo.main,
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "keywords": projectInfo.keywords,
        "author": projectInfo.author,
        "license": projectInfo.license,
        "dependencies": {
            "async": "^2.6.0",
            "body-parser": "^1.18.2",
            "crypto-js": "^3.1.9-1",
            "express": "^4.16.2",
            "express-mailer": "^0.3.1",
            "express-rate-limit": "^3.4.0",
            "fcm-node": "^1.3.0",
            "fluent-ffmpeg": "^2.1.2",
            "formidable": "^1.1.1",
            "fs-extra": "^8.0.1",
            "jsonwebtoken": "^8.1.1",
            "mongoose": "^5.0.3",
            "mongoose-double": "0.0.1",
            "nodemailer": "^4.6.8",
            "randomstring": "^1.1.5",
            "request": "^2.83.0",
            "sharp": "^0.21.0",
            "slice": "^1.0.0",
            "socket.io": "^2.2.0",
            "underscore": "^1.9.1"
        }
    }

    if (projectInfo.repo != '') {
        data.repository = {
            "type": "git",
            "url": "git+" + projectInfo.repo + ".git"
        }

        data.bugs = {
            "url": projectInfo.repo + "/issues"
        }

        data.hompage = projectInfo.repo + "#readme"
    }

    try {
        fs.writeFileSync(root + '/package.json', JSON.stringify(data, null, 4))
        console.log(success('✅ Generate `package.json` file successfully --> Next !!!'));
    } catch (err) {
        throw err;
    }
}

function generateREADME(root) {
    try {
        let readmeData = fs.readFileSync(__dirname + '/template/README.md');
        fs.writeFileSync(root + '/README.md', readmeData);
        console.log(success('✅ Generate `README.md` file successfully --> Next !!!'));
    } catch (err) {
        throw err;
    }
}

exports.generateProjectStructure = function (root, inputData) {
    try {
        // Generate folder structure
        fs.mkdirSync(root + '/config');
        fs.mkdirSync(root + '/core');
        fs.mkdirSync(root + '/core/entity');
        fs.mkdirSync(root + '/core/use_case');
        fs.mkdirSync(root + '/data_provider');
        fs.mkdirSync(root + '/logs');
        fs.mkdirSync(root + '/routes');
        fs.mkdirSync(root + '/utils');
        console.log(success('✅ Generate folder structure successfully --> Next !!!'));

        // Generate file`package.json`
        generatePackageJSON(root, inputData);

        // Generate file`README.md`
        generateREADME(root);

        // Generate file`.gitignore`


        // Generate file`server.js`


        // Generate files in `utils` folder


        // Generate file`config.js`


        return 0;
    } catch (err) {
        console.log(error('❌ ' + err));
        return 1;
    }
}