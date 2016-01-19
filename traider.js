var express = require('express'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    passport=require('passport'),
    morgan=require('morgan'),
    flash= require('connect-flash');
    
var routes = require('./routes/routes.js');
var MongoStore = require('connect-mongostore')({
    session: expressSession
});


createServer = function createServer() {

    var server = express();
    // specify middleware 
    server.use(express.bodyParser());
    server.use(express.static(__dirname + '/public'));
    server.use('/product/*', express.static(__dirname + '/public'));
    server.use('/basket/', express.static(__dirname + '/public'));
    server.use('/admin/',express.static(__dirname+'/public/admin'))

    server.use(morgan('dev')); //log every request to console

    server.use(cookieParser());
    server.use(expressSession({
        secret: 'mdfkldfgkl&*(sas/d,asldsjf()*)(mlksdmfNfjSDsdfYUHNn',
        store: new MongoStore({
            db: 'traiderioSessions'
        })
    }));
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(flash());
    require('./db/passport')(passport);

    // attach router handlers
    routes.attachHandlers(server,passport); //, passport);

    return server;

};


var server = createServer();
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
    console.log("Listening on " + port);
});