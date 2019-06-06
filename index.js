var _ = require('underscore'),
    fs = require('fs'),
    IO = require('./IO'),
    mongoose = require("mongoose"),
    async = require('async');
var yargs = require('yargs'),
    argv = yargs.argv;

//========================================CONNECT DB====================================================
var connectionString = 'mongodb://' + argv.username + ':' + argv.password + '@' +
argv.host + "/" + argv.name + argv.optional;

mongoose.connect(connectionString)
    .then(() => {
        db = mongoose.connection;
        console.log('MongoDb connection created to [' + db.name + ']');
        resolve(db);
    })
    .catch(err => {
        console.log('Error creating MongoDb connection: ' + err);
        reject(err);
    });
//======================================#END CONNECT DB=====================================================



// =======================================GENERATE FILE===============================================
var cmd1 = 'mkdir routes core data_provider entity use_case';
var cmd2 = 'mv entity core';
var cmd3 = 'mv use_case core';

IO.execute(cmd1, cmd2, cmd3);

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
    //trying to get collection names
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names)
        console.log('-------------------')
        console.log('-------------------')

        _.each(names, (item) => {
            db1 = 'touch' + ' ' + 'routes' + '/' + item.name + '.js'
            IO.execute(db1)
        })

        _.each(names, (item) => {
            db2 = 'touch' + ' ' + 'core/entity/' + item.name + '.js'
            db21 = 'touch' + ' ' + 'core/use_case/' + item.name + '.js'
            IO.execute(db2, db21)
        })

        _.each(names, (item) => {
            db3 = 'touch' + ' ' + 'data_provider' + '/' + item.name + '.js'
            IO.execute(db3)
        })
        console.log('Create file model file successful')
    });
})
//=================================#END GENERATE FILE====================================



//===========================GENERATE ENTITY===========================================
mongoose.connection.on('open', function (ref) {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        _.each(names, (item) => {
            mongoose.connection.db.collection(item.name).find({}).toArray(function (err, result) {
                _.each(result, (it) => {
                    let keys = _.keys(it)
                    typeList = _.rest(_.map(keys, (k) => {
                        return k + ': ' + IO.mongoTypeOf(it[k])
                    }))
                    let demoCoreEntity = fs.readFileSync('demo/core.js').toString()
                        .replace('[[RESET_CODE]]', IO.toProperCase(item.name) + 'Schema')
                        .replace('[[RESET_CODE1]]', IO.toProperCase(item.name) + 'Schema')
                        .replace('[[RESET_CODE2]]', IO.toProperCase(item.name) + 'Schema')
                        .replace('[[NAMEDB]]', item.name)
                        .replace('[[NAME]]', IO.toProperCase(item.name))
                        .replace('[[NAME1]]', IO.toProperCase(item.name))
                        .replace('[[NAME_ENTITY]]', IO.toProperCase(item.name) + 'Entity')
                        .replace('[[RESET_TYPE]]', typeList)
                    fs.writeFileSync('core/entity/' + item.name + '.js', demoCoreEntity.toString());
                })
            })
        })
        typeList = _.map(names, (item) => {
            return (IO.toProperCase(item.name) + ' = ' + ' require("' + './' + item.name + '"' + ')')
        })
        router = _.map(names, (item) => {
            return 'exports.' + IO.toProperCase(item.name) + 'Entity' + ' = ' + IO.toProperCase(item.name) + '.' + IO.toProperCase(item.name) + 'Entity;'
        })
        router = router.toString().replace(/;,/g, ';')
        let demoIndex = fs.readFileSync('demo/coreEntiryIndex.js').toString()
            .replace('[[ROUTES]]', typeList)
            .replace('[[ROUTESENTITY]]', router)
        fs.writeFileSync('core/entity/index.js', demoIndex.toString());
        console.log('Create file entity successful')
    });
})
//===============================#END GENERATE ENTITY===========================================



//==============================GENERATE USER_CAER=============================================
mongoose.connection.on('open', function (ref) {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        _.each(names, (item) => {
            let demoCoreUsercase = fs.readFileSync('demo/use_case.js').toString()
                .replace('[[DBNAME]]', item.name)
                .replace('[[NAMEID1]]', item.name + 'Id')
                .replace('[[NAMEID2]]', item.name + 'Id')
                .replace('[[NAMEID3]]', item.name + 'Id')
                .replace('[[NAMEID4]]', item.name + 'Id')
            fs.writeFileSync('core/use_case/' + item.name + '.js', demoCoreUsercase.toString());
        })
        console.log('Create file use_case successful')
    });
})
//==============================#END GENERATE USER_CAER===========================================



//==============================GENERATE ROUTES=============================================
mongoose.connection.on('open', function (ref) {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        _.each(names, (item) => {
            let demoRoutes = fs.readFileSync('demo/routes.js').toString()
                .replace('[[DBNAME]]', item.name)
                .replace('[[DBNAME1]]', item.name)
                .replace('[[DBNAME2]]', item.name)
                .replace('[[NAMEID1]]', item.name + 'Id')
                .replace('[[NAMEID2]]', item.name + 'Id')
                .replace('[[NAMEID3]]', item.name + 'Id')
                .replace('[[NAMEID4]]', item.name + 'Id')
                .replace('[[NAMEID5]]', item.name + 'Id')
                .replace('[[NAMEID6]]', item.name + 'Id')
                .replace('[[NAMEID7]]', item.name + 'Id')
            fs.writeFileSync('routes/' + item.name + '.js', demoRoutes.toString());
        })
        typeList = _.map(names, (item) => {
            return (IO.toProperCase(item.name) + ' = ' + ' require("' + './' + item.name + '"' + ')')
        })
        router = _.map(names, (item) => {
            return "app.post('/" + item.name + "/getAll'," + IO.toProperCase(item.name) + ".getAll);" +
                "app.post('/" + item.name + "/getById'," + IO.toProperCase(item.name) + ".getById);" +
                "app.post('/" + item.name + "/create'," + IO.toProperCase(item.name) + ".create);" +
                "app.post('/" + item.name + "/delete'," + IO.toProperCase(item.name) + ".delete);" +
                "app.post('/" + item.name + "/update'," + IO.toProperCase(item.name) + ".update);"
        })
        router = router.toString().replace(/;,/g, ';')
        let demoIndex = fs.readFileSync('demo/routesIndex.js').toString()
            .replace('[[ROUTES]]', typeList)
            .replace('[[ROUTESAPI]]', router)
        fs.writeFileSync('routes/index.js', demoIndex.toString());
        console.log('Create file routes successful')
    });
})
//==============================#END GENERATE ROUTES======================================



//==============================GENERATE DATA_PROVIDER=============================================
mongoose.connection.on('open', function (ref) {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        _.each(names, (item) => {
            mongoose.connection.db.collection(item.name).find({}).toArray(function (err, result) {
                _.each(result, (it) => {
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
                        .replace('[[DBENTITY]]', IO.toProperCase(item.name) + 'Entity')
                        .replace('[[DBENTITY1]]', IO.toProperCase(item.name) + 'Entity')
                        .replace('[[DBENTITY2]]', IO.toProperCase(item.name) + 'Entity')
                        .replace('[[DBENTITY3]]', IO.toProperCase(item.name) + 'Entity')
                        .replace('[[DBENTITY4]]', IO.toProperCase(item.name) + 'Entity')
                        .replace('[[DBENTITY5]]', IO.toProperCase(item.name) + 'Entity')
                        .replace('[[NAMEID]]', item.name + 'Id')
                        .replace('[[NAMEID1]]', item.name + 'Id')
                        .replace('[[NAMEID2]]', item.name + 'Id')
                        .replace('[[NAMEID3]]', item.name + 'Id')
                        .replace('[[NAMEID4]]', item.name + 'Id')
                        .replace('[[NAMEID5]]', item.name + 'Id')
                        .replace('[[NAMEID6]]', item.name + 'Id')
                        .replace('[[NAMEID7]]', item.name + 'Id')
                        .replace('[[DBNAME]]', IO.toProperCase(item.name))
                        .replace('[[DBNAME1]]', IO.toProperCase(item.name))
                        .replace('[[DBNAME2]]', IO.toProperCase(item.name))
                        .replace('[[DBNAME3]]', IO.toProperCase(item.name))
                        .replace('[[DBNAME4]]', IO.toProperCase(item.name))
                        .replace('[[RESET_TYPE]]', typeList)
                        .replace('[[RESET_TYPE1]]', typeList)
                        .replace('[[UPDATE]]', update)
                    fs.writeFileSync('data_provider/' + item.name + '.js', demoDataprovider.toString());
                })
            })
        })
        console.log('Create file data_provider successful')
    });
})
//================================#END GENERATE DATA_PROVIDER========================================