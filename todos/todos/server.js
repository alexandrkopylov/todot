var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cookieParser = require('cookie-parser');
var session = require('express-session');

var configDB = require('./config/database.js')



mongoose.connect(configDB.url);

var Todo = mongoose.model('Todo', {
    text: String
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('OpenDatabase');
});

require('./config/passport')(passport);

//    app.use(express.static(__dirname + '/public'));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(flash());
    app.set('view engine', 'ejs');
    app.use(session({secret:'sessionsecretitodo'}));
    app.use(passport.initialize());
    app.use(passport.session());
//    app.use(express.cookieParser());


require('./app/routes.js')(app,passport,Todo);


// starting server
var server = app.listen(port, function () {
    console.log('App listening on port' +port);
});
