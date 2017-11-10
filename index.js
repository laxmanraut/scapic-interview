const Hapi = require('hapi');
var questions = require('./db/db-data')
var dbconig = require('./db/config.json')

var emaiCofig = require('./email-config.json')

var MongoClient = require('mongodb').MongoClient;


var server = new Hapi.Server();
server.connection({port: process.env.PORT || 8000});
server.register([
        {register:require('inert')},
        {register:require('hapi-auth-jwt')},
        {register:require('bell')},
        {register:require('vision')}
    ], err=>{

    if(err){
        throw err;
    }


    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path:'./public/views',
        isCached: false

    })

    
    MongoClient.connect(dbconig.url, function(err, db) {
        if (err) throw err;

        //db.collection("users").drop();
        //db.collection("answers").drop();



        db.collection("questions").drop(function(err, res){
            db.collection("questions").insertMany(questions, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    });

    server.state('data', {
        ttl: null,
        isSecure: false,
        isHttpOnly: false,
        encoding: 'base64json',
        clearInvalid: false,
        strictHeader: false
    });

    server.auth.strategy('google','bell',emaiCofig.config);



    


    server.route(require('./lib/routes/admin-routes'));
    server.route(require('./lib/routes/user-routes'));
    
    server.start((err)=>{
    
        if(err){
            throw err;
        }
    
        console.log('Server started at : ',server.info.uri);
    
    })

})

