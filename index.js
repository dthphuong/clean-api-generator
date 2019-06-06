var _ = require('underscore'),
    fs = require('fs'),
    IO = require('./IO'),
    mongoose = require("mongoose"),
    async = require('async');
var yargs = require('yargs'),
    argv = yargs.argv;

//========================================CONNECT DB====================================================
var connectionString = '';
if (argv.username == undefined || argv.password == undefined || argv.optional == undefined) {
    connectionString = 'mongodb://' + argv.host + "/" + argv.nameDb;
} else {
    connectionString = 'mongodb://' + argv.username + ':' + argv.password + '@' +
        argv.host + "/" + argv.dbName + argv.optional;
}
mongoose.connect(connectionString)
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
                    let demoCoreEntity = fs.readFileSync('demo/entity.js').toString()
                        .replace(new RegExp('NAMESCHEMA', 'g'), IO.toProperCase(item.name) + 'Schema')
                        .replace(new RegExp('ENTITY', 'g'), IO.toProperCase(item.name))
                        .replace('NAMEDB', item.name)
                        .replace('ENTITNAME', IO.toProperCase(item.name) + 'Entity')
                        .replace('TYPE', typeList)
                    fs.writeFileSync('core/entity/' + item.name + '.js', demoCoreEntity.toString());
                })
            })
        })
        typeList = _.map(names, (item) => {
            return (IO.toProperCase(item.name) + ' = ' + " require('" + './' + item.name + "'" + ')')
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
                .replace('DBNAME', item.name)
                .replace(new RegExp('NAMEID', 'g'), item.name + 'Id')
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
                .replace(new RegExp('DBNAME', 'g'), item.name)
                .replace(new RegExp('NAMEID', 'g'), item.name + 'Id')
            fs.writeFileSync('routes/' + item.name + '.js', demoRoutes.toString());
        })
        typeList = _.map(names, (item) => {
            return (IO.toProperCase(item.name) + ' = ' + " require('" + './' + item.name + "'" + ')')
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
                        .replace(new RegExp('DBENTITY', 'g'), IO.toProperCase(item.name) + 'Entity')
                        .replace(new RegExp('NAMEID', 'g'), item.name + 'Id')
                        .replace(new RegExp('DBNAME', 'g'), IO.toProperCase(item.name))
                        .replace(new RegExp('DATA', 'g'), typeList)
                        .replace('UPDATE', update)
                    fs.writeFileSync('data_provider/' + item.name + '.js', demoDataprovider.toString());
                })
            })
        })
        console.log('Create file data_provider successful')
    });
})
//================================#END GENERATE DATA_PROVIDER========================================
function genrateEntity(collectionName, listKey, listType) {
    var cmd1 = 'mkdir core entity';
    var cmd2 = 'mv entity core';
    IO.execute(cmd1, cmd2);
    _.each(collectionName, (item) => {
        db2 = 'touch' + ' ' + 'core/entity/' + item + '.js'
        IO.execute(db2)
        typeList = _.rest(_.map(listKey, (k) => {
            return k + ': ' + IO.mongoTypeOf(listType[k])
        }))
        let demoCoreEntity = fs.readFileSync('demo/entity.js').toString()
            .replace(new RegExp('NAMESCHEMA', 'g'), IO.toProperCase(item) + 'Schema')
            .replace(new RegExp('ENTITY', 'g'), IO.toProperCase(item))
            .replace('NAMEDB', item)
            .replace('ENTITNAME', IO.toProperCase(item) + 'Entity')
            .replace('TYPE', typeList)
        fs.writeFileSync('core/entity/' + item + '.js', demoCoreEntity.toString());
    })
    typeList = _.map(collectionName, (item) => {
        return (IO.toProperCase(item) + ' = ' + " require('" + './' + item + "'" + ')')
    })
    router = _.map(collectionName, (item) => {
        return 'exports.' + IO.toProperCase(item) + 'Entity' + ' = ' + IO.toProperCase(item) + '.' + IO.toProperCase(item) + 'Entity;'
    })
    router = router.toString().replace(/;,/g, ';')
    let demoIndex = fs.readFileSync('demo/coreEntiryIndex.js').toString()
        .replace('[[ROUTES]]', typeList)
        .replace('[[ROUTESENTITY]]', router)
    fs.writeFileSync('core/entity/index.js', demoIndex.toString());
}

function genrateUsecase(collectionName) {
    var cmd1 = 'mkdir core use_case';
    var cmd2 = 'mv use_case core';
    IO.execute(cmd1, cmd2);
    _.each(collectionName, (item) => {
        db = 'touch' + ' ' + 'core/use_case/' + item + '.js'
        IO.execute(db)
    })
    _.each(collectionName, (item) => {
        let demoCoreUsercase = fs.readFileSync('demo/use_case.js').toString()
            .replace('DBNAME', item)
            .replace(new RegExp('NAMEID', 'g'), item + 'Id')
        fs.writeFileSync('core/use_case/' + item + '.js', demoCoreUsercase.toString());
    })
}

function genrateRoutes(collectionName) {
    var cmd = 'mkdir routes';
    IO.execute(cmd);
    _.each(collectionName, (item) => {
        db = 'touch' + ' ' + 'routes' + '/' + item + '.js'
        IO.execute(db)
    })
    _.each(collectionName, (item) => {
        let demoRoutes = fs.readFileSync('demo/routes.js').toString()
            .replace(new RegExp('DBNAME', 'g'), item)
            .replace(new RegExp('NAMEID', 'g'), item + 'Id')
        fs.writeFileSync('routes/' + item + '.js', demoRoutes.toString());
    })
    typeList = _.map(collectionName, (item) => {
        return (IO.toProperCase(item) + ' = ' + " require('" + './' + item + "'" + ')')
    })
    router = _.map(collectionName, (item) => {
        return "app.post('/" + item + "/getAll'," + IO.toProperCase(item) + ".getAll);" +
            "app.post('/" + item + "/getById'," + IO.toProperCase(item) + ".getById);" +
            "app.post('/" + item + "/create'," + IO.toProperCase(item) + ".create);" +
            "app.post('/" + item + "/delete'," + IO.toProperCase(item) + ".delete);" +
            "app.post('/" + item + "/update'," + IO.toProperCase(item) + ".update);"
    })
    router = router.toString().replace(/;,/g, ';')
    let demoIndex = fs.readFileSync('demo/routesIndex.js').toString()
        .replace('[[ROUTES]]', typeList)
        .replace('[[ROUTESAPI]]', router)
    fs.writeFileSync('routes/index.js', demoIndex.toString());
}

function genrateDataprovider(collectionName, listKey, listType) {
    var cmd = 'mkdir data_provider';
    IO.execute(cmd);
    _.each(collectionName, (item) => {
        db3 = 'touch' + ' ' + 'data_provider' + '/' + item + '.js'
        IO.execute(db3)
    })
    _.each(collectionName, (item) => {
        typeList = _.rest(_.map(listKey, (k) => {
            if (IO.mongoTypeOf(listType[k]) == 'ObjectId') {
                return "'" + k + "'" + ': ' + ' mongoose.Types.ObjectId' + '(data.' + k + ')'
            }
            return "'" + k + "'" + ': ' + 'data.' + k
        }))
        update = _.rest(_.map(listKey, (k) => {
            if (IO.mongoTypeOf(listType[k]) == 'ObjectId') {
                return '((' + 'data.' + k + ' ==' + "''" + ' ||' + ' data.' + k + ' ==' + ' undefined)' + ' ?' + ' result[0].' + k + ' :' + ' mongoose.Types.ObjectId' + ' (data.' + k + '))'
            }
            return '((' + 'data.' + k + ' ==' + "''" + ' ||' + ' data.' + k + ' ==' + ' undefined)' + ' ?' + ' result[0].' + k + ' :' + ' data.' + k + ')'
        }))
        update = update.toString().replace(/,/g, ';')
        let demoDataprovider = fs.readFileSync('demo/data_provider.js').toString()
            .replace(new RegExp('DBENTITY', 'g'), IO.toProperCase(item) + 'Entity')
            .replace(new RegExp('NAMEID', 'g'), item + 'Id')
            .replace(new RegExp('DBNAME', 'g'), IO.toProperCase(item))
            .replace(new RegExp('DATA', 'g'), typeList)
            .replace('UPDATE', update)
        fs.writeFileSync('data_provider/' + item + '.js', demoDataprovider.toString());
    })
}