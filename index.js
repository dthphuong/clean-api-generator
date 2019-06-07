var _ = require('underscore'),
    fs = require('fs'),
    IO = require('./IO'),
    mongoose = require("mongoose"),
    async = require('async');
var yargs = require('yargs'),
    argv = yargs.argv;

//========================================CONNECT DB====================================================
// var connectionString = '';
// if (argv.username == undefined || argv.password == undefined || argv.optional == undefined) {
//     connectionString = 'mongodb://' + argv.host + "/" + argv.nameDb;
// } else {
//     connectionString = 'mongodb://' + argv.username + ':' + argv.password + '@' +
//         argv.host + "/" + argv.dbName + argv.optional;
// }
// mongoose.connect(connectionString)
//======================================#END CONNECT DB=====================================================



// =======================================GENERATE FILE===============================================
// var cmd1 = 'mkdir routes core data_provider entity use_case';
// var cmd2 = 'mv entity core';
// var cmd3 = 'mv use_case core';

// IO.execute(cmd1, cmd2, cmd3);

// mongoose.connection.on('open', function (ref) {
//     console.log('Connected to mongo server.');
//     //trying to get collection names
//     mongoose.connection.db.listCollections().toArray(function (err, names) {

//         _.each(names, (item) => {
//             db1 = 'touch' + ' ' + 'routes' + '/' + item.name + '.js'
//             IO.execute(db1)
//         })

//         _.each(names, (item) => {
//             db2 = 'touch' + ' ' + 'core/entity/' + item.name + '.js'
//             db21 = 'touch' + ' ' + 'core/use_case/' + item.name + '.js'
//             IO.execute(db2, db21)
//         })

//         _.each(names, (item) => {
//             db3 = 'touch' + ' ' + 'data_provider' + '/' + item.name + '.js'
//             IO.execute(db3)
//         })
//         console.log('Create file model file successful')
//     });
// })
//=================================#END GENERATE FILE====================================



//===========================GENERATE ENTITY===========================================
// mongoose.connection.on('open', function (ref) {
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         _.each(names, (item) => {
//             mongoose.connection.db.collection(item.name).find({}).toArray(function (err, result) {
//                 _.each(result, (it) => {
//                     let keys = _.keys(it)
//                     typeList = _.rest(_.map(keys, (k) => {
//                         return k + ': ' + IO.mongoTypeOf(it[k])
//                     }))
//                     let demoCoreEntity = fs.readFileSync('demo/entity.js').toString()
//                         .replace(new RegExp('NAMESCHEMA', 'g'), IO.toProperCase(item.name) + 'Schema')
//                         .replace(new RegExp('ENTITY', 'g'), IO.toProperCase(item.name))
//                         .replace('NAMEDB', item.name)
//                         .replace('ENTITNAME', IO.toProperCase(item.name) + 'Entity')
//                         .replace('TYPE', typeList)
//                     fs.writeFileSync('core/entity/' + item.name + '.js', demoCoreEntity.toString());
//                 })
//             })
//         })
//         typeList = _.map(names, (item) => {
//             return (IO.toProperCase(item.name) + ' = ' + " require('" + './' + item.name + "'" + ')')
//         })
//         router = _.map(names, (item) => {
//             return 'exports.' + IO.toProperCase(item.name) + 'Entity' + ' = ' + IO.toProperCase(item.name) + '.' + IO.toProperCase(item.name) + 'Entity;'
//         })
//         router = router.toString().replace(/;,/g, ';')
//         let demoIndex = fs.readFileSync('demo/coreEntiryIndex.js').toString()
//             .replace('[[ROUTES]]', typeList)
//             .replace('[[ROUTESENTITY]]', router)
//         fs.writeFileSync('core/entity/index.js', demoIndex.toString());
//         console.log('Create file entity successful')
//     });
// })
//===============================#END GENERATE ENTITY===========================================



//==============================GENERATE USER_CAER=============================================
// mongoose.connection.on('open', function (ref) {
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         _.each(names, (item) => {
//             let demoCoreUsercase = fs.readFileSync('demo/use_case.js').toString()
//                 .replace('DBNAME', item.name)
//                 .replace(new RegExp('NAMEID', 'g'), item.name + 'Id')
//             fs.writeFileSync('core/use_case/' + item.name + '.js', demoCoreUsercase.toString());
//         })
//         console.log('Create file use_case successful')
//     });
// })
//==============================#END GENERATE USER_CAER===========================================



//==============================GENERATE ROUTES=============================================
// mongoose.connection.on('open', function (ref) {
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         _.each(names, (item) => {
//             let demoRoutes = fs.readFileSync('demo/routes.js').toString()
//                 .replace(new RegExp('DBNAME', 'g'), item.name)
//                 .replace(new RegExp('NAMEID', 'g'), item.name + 'Id')
//             fs.writeFileSync('routes/' + item.name + '.js', demoRoutes.toString());
//         })
//         typeList = _.map(names, (item) => {
//             return (IO.toProperCase(item.name) + ' = ' + " require('" + './' + item.name + "'" + ')')
//         })
//         router = _.map(names, (item) => {
//             return "app.post('/" + item.name + "/getAll'," + IO.toProperCase(item.name) + ".getAll);" +
//                 "app.post('/" + item.name + "/getById'," + IO.toProperCase(item.name) + ".getById);" +
//                 "app.post('/" + item.name + "/create'," + IO.toProperCase(item.name) + ".create);" +
//                 "app.post('/" + item.name + "/delete'," + IO.toProperCase(item.name) + ".delete);" +
//                 "app.post('/" + item.name + "/update'," + IO.toProperCase(item.name) + ".update);"
//         })
//         router = router.toString().replace(/;,/g, ';')
//         let demoIndex = fs.readFileSync('demo/routesIndex.js').toString()
//             .replace('[[ROUTES]]', typeList)
//             .replace('[[ROUTESAPI]]', router)
//         fs.writeFileSync('routes/index.js', demoIndex.toString());
//         console.log('Create file routes successful')
//     });
// })
//==============================#END GENERATE ROUTES======================================



//==============================GENERATE DATA_PROVIDER=============================================
// mongoose.connection.on('open', function (ref) {
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         _.each(names, (item) => {
//             mongoose.connection.db.collection(item.name).find({}).toArray(function (err, result) {
//                 console.log(result)
//                 _.each(result, (it) => {
//                     let keys = _.keys(it);
//                     typeList = _.rest(_.map(keys, (k) => {
//                         if (IO.mongoTypeOf(it[k]) == 'ObjectId') {
//                             return "'" + k + "'" + ': ' + ' mongoose.Types.ObjectId' + '(data.' + k + ')'
//                         }
//                         return "'" + k + "'" + ': ' + 'data.' + k
//                     }))
//                     update = _.rest(_.map(keys, (k) => {
//                         if (IO.mongoTypeOf(it[k]) == 'ObjectId') {
//                             return '((' + 'data.' + k + ' ==' + "''" + ' ||' + ' data.' + k + ' ==' + ' undefined)' + ' ?' + ' result[0].' + k + ' :' + ' mongoose.Types.ObjectId' + ' (data.' + k + '))'
//                         }
//                         return '((' + 'data.' + k + ' ==' + "''" + ' ||' + ' data.' + k + ' ==' + ' undefined)' + ' ?' + ' result[0].' + k + ' :' + ' data.' + k + ')'
//                     }))
//                     // typeList = typeList.toString().replace(/',\n'/g, '\n,')
//                     update = update.toString().replace(/,/g, ';')
//                     let demoDataprovider = fs.readFileSync('demo/data_provider.js').toString()
//                         .replace(new RegExp('DBENTITY', 'g'), IO.toProperCase(item.name) + 'Entity')
//                         .replace(new RegExp('NAMEID', 'g'), item.name + 'Id')
//                         .replace(new RegExp('DBNAME', 'g'), IO.toProperCase(item.name))
//                         .replace(new RegExp('DATA', 'g'), typeList)
//                         .replace('UPDATE', update)
//                     fs.writeFileSync('data_provider/' + item.name + '.js', demoDataprovider.toString());
//                 })
//             })
//         })
//         console.log('Create file data_provider successful')
//     });
// })
//================================#END GENERATE DATA_PROVIDER========================================


function genrateFile(collectionName) {
    var cmd1 = 'mkdir routes core data_provider entity use_case';
    var cmd2 = 'mv entity core';
    var cmd3 = 'mv use_case core';

    IO.execute(cmd1, cmd2, cmd3);

    // _.each(collectionName, (item) => {
    db1 = 'touch' + ' ' + 'routes' + '/' + collectionName + '.js'
    IO.execute(db1)
    // })

    // _.each(collectionName, (item) => {
    db2 = 'touch' + ' ' + 'core/entity/' + collectionName + '.js'
    db21 = 'touch' + ' ' + 'core/use_case/' + collectionName + '.js'
    IO.execute(cmd1, db2, db21)
    // })

    // _.each(collectionName, (item) => {
    db3 = 'touch' + ' ' + 'data_provider' + '/' + collectionName + '.js'
    IO.execute(db3)
    // })
    console.log('Create file model file successful')
}

function genrateEntity(collectionName, data) {
    _.each(data, (it) => {
        let keys = _.keys(it)
        typeList = _.rest(_.map(keys, (k) => {
            return k + ': ' + IO.mongoTypeOf(it[k])
        }))
        console.log(typeList)
        let demoCoreEntity = fs.readFileSync('demo/entity.js').toString()
            .replace(new RegExp('NAMESCHEMA', 'g'), IO.toProperCase(collectionName) + 'Schema')
            .replace(new RegExp('ENTITY', 'g'), IO.toProperCase(collectionName))
            .replace('NAMEDB', collectionName)
            .replace('ENTITNAME', IO.toProperCase(collectionName) + 'Entity')
            .replace('TYPE', typeList)
        fs.writeFileSync('core/entity/' + collectionName + '.js', demoCoreEntity.toString());
    })
    // })
    // typeList = _.map(collectionName, (item) => {
    var typeList = (IO.toProperCase(collectionName) + ' = ' + " require('" + './' + collectionName + "'" + ')')
    // })
    // router = _.map(collectionName, (item) => {
    var router = 'exports.' + IO.toProperCase(collectionName) + 'Entity' + ' = ' + IO.toProperCase(collectionName) + '.' + IO.toProperCase(collectionName) + 'Entity;'
    // })
    router = router.toString().replace(/;,/g, ';')
    let demoIndex = fs.readFileSync('demo/coreEntiryIndex.js').toString()
        .replace('[[ROUTES]]', typeList)
        .replace('[[ROUTESENTITY]]', router)
    fs.writeFileSync('core/entity/index.js', demoIndex.toString());
}

function genrateUsecase(collectionName) {
    // _.each(collectionName, (item) => {
    let demoCoreUsercase = fs.readFileSync('demo/use_case.js').toString()
        .replace('DBNAME', collectionName)
        .replace(new RegExp('NAMEID', 'g'), collectionName + 'Id')
    fs.writeFileSync('core/use_case/' + collectionName + '.js', demoCoreUsercase.toString());
    // })
}

function genrateRoutes(collectionName) {
    let demoRoutes = fs.readFileSync('demo/routes.js').toString()
        .replace(new RegExp('DBNAME', 'g'), collectionName)
        .replace(new RegExp('NAMEID', 'g'), collectionName + 'Id')
    fs.writeFileSync('routes/' + collectionName + '.js', demoRoutes.toString());
    var typeList = (IO.toProperCase(collectionName) + ' = ' + " require('" + './' + collectionName + "'" + ')')
    var router = "app.post('/" + collectionName + "/getAll'," + IO.toProperCase(collectionName) + ".getAll);" +
        "app.post('/" + collectionName + "/getById'," + IO.toProperCase(collectionName) + ".getById);" +
        "app.post('/" + collectionName + "/create'," + IO.toProperCase(collectionName) + ".create);" +
        "app.post('/" + collectionName + "/delete'," + IO.toProperCase(collectionName) + ".delete);" +
        "app.post('/" + collectionName + "/update'," + IO.toProperCase(collectionName) + ".update);"
    router = router.toString().replace(/;,/g, ';')
    let demoIndex = fs.readFileSync('demo/routesIndex.js').toString()
        .replace('[[ROUTES]]', typeList)
        .replace('[[ROUTESAPI]]', router)
    fs.writeFileSync('routes/index.js', demoIndex.toString());
}

function genrateDataprovider(collectionName, data) {
    // _.each(collectionName, (item) => {
    _.each(data, (it) => {
        let keys = _.keys(it);
        typeList = _.rest(_.map(keys, (k) => {
            if (IO.mongoTypeOf(it[k]) == 'ObjectId') {
                return "'" + k + "'" + ': ' + ' mongoose.Types.ObjectId' + '(data.' + k + ')'
            }
            return "'" + k + "'" + ': ' + 'data.' + k
        }))
        update = _.rest(_.map(keys, (k) => {
            if (IO.mongoTypeOf(it[k]) == 'ObjectId') {
                return '((' + 'data.' + k + ' ==' + "''" + ' ||' + ' data.' + k + ' ==' + ' undefined)' + ' ?' + ' result[0].' + k + ' :' + ' mongoose.Types.ObjectId' + ' (data.' + k + '))'
            }
            return '((' + 'data.' + k + ' ==' + "''" + ' ||' + ' data.' + k + ' ==' + ' undefined)' + ' ?' + ' result[0].' + k + ' :' + ' data.' + k + ')'
        }))
        // typeList = typeList.toString().replace(/',\n'/g, '\n,')
        update = update.toString().replace(/,/g, ';')
        let demoDataprovider = fs.readFileSync('demo/data_provider.js').toString()
            .replace(new RegExp('DBENTITY', 'g'), IO.toProperCase(collectionName) + 'Entity')
            .replace(new RegExp('NAMEID', 'g'), collectionName + 'Id')
            .replace(new RegExp('DBNAME', 'g'), IO.toProperCase(collectionName))
            .replace(new RegExp('DATA', 'g'), typeList)
            .replace('UPDATE', update)
        fs.writeFileSync('data_provider/' + collectionName + '.js', demoDataprovider.toString());
    })
    // })
}

var collectionName = 'user';
var data = [{
    _id: '5ce26ec6754486030d015510',
    participantId: '5cd7902dc75c2b5c00f3d80c',
    eventId: '5ce26ec5754486030d01550f'
}]
genrateFile(collectionName)
genrateEntity(collectionName, data)
genrateUsecase(collectionName)
genrateRoutes(collectionName)
genrateDataprovider(collectionName, data)