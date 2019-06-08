var _ = require('underscore'),
    fs = require('fs'),
    IO = require('./IO'),
    mongoose = require("mongoose"),
    async = require('async');
var yargs = require('yargs'),
    argv = yargs.argv;

//========================================CONNECT DB====================================================
var connectionString = '';
if (argv.username == undefined || argv.password == undefined) {
    connectionString = 'mongodb://' + argv.host + "/" + argv.nameDb + argv.optional;
} else {
    connectionString = 'mongodb://' + argv.username + ':' + argv.password + '@' +
        argv.host + "/" + argv.dbName + argv.optional;
}
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

var cmd1 = 'mkdir routes core data_provider entity use_case config util';
var cmd2 = 'mv entity core';
var cmd3 = 'mv use_case core';


IO.execute(cmd1)
IO.execute2(cmd2, cmd3)

mongoose.connection.on('open', function (ref) {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        _.each(names, (item) => {
            console.log('Collections is : ' + item.name)
            cmd4 = 'touch' + ' ' + 'routes' + '/' + item.name + '.js'
            cmd5 = 'touch' + ' ' + 'core/entity/' + item.name + '.js'
            cmd6 = 'touch' + ' ' + 'core/use_case/' + item.name + '.js'
            cmd7 = 'touch' + ' ' + 'data_provider' + '/' + item.name + '.js'
            IO.execute4(cmd4, cmd5, cmd6, cmd7)
        })
        console.log('Create file model file successful')
    });
})
//=================================#END GENERATE FILE====================================


//=================================GENERATR SERVER ====================================

let demoServer = fs.readFileSync('demo/server.js').toString()
fs.writeFileSync('server.js', demoServer.toString());
//==================================#END GENERATE SERVER===============================


//=================================GENERATE CONFIG SERVER=============================

let demoConfig = fs.readFileSync('demo/config.js').toString()
    .replace('[[HOST]]', argv.host)
    .replace('[[PORT]]', argv.port)
    .replace('[[dbName]]', argv.dbName)
    .replace('[[username]]', argv.username)
    .replace('[[password]]', argv.password)
    .replace('[[optional]]', argv.optional)
fs.writeFileSync('config/index.js', demoConfig.toString());
//==================================#END GENERATE CONFIG SERVER ========================


//===============================GENERATE UTIL==========================================

let demoJWT = fs.readFileSync('demo/jwt.js').toString();
fs.writeFileSync('util/JWT.js', demoJWT.toString());

let demoLMT = fs.readFileSync('demo/limiter.js').toString();
fs.writeFileSync('util/Limiter.js', demoLMT.toString());

let demoIndex = fs.readFileSync('demo/utilIndex.js').toString();
fs.writeFileSync('util/index.js', demoIndex.toString());

let demoMongo = fs.readFileSync('demo/MongoConnect.js').toString();
fs.writeFileSync('util/MongoConnect.js', demoMongo.toString());
//=============================#END  GENERATE UTIL=====================================


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