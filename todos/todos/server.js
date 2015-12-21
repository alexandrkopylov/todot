var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


var Todo = mongoose.model('Todo', {
    text: String
});

mongoose.connect('mongodb://localhost/todo');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get('/api/todos', function (req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

app.get('/', function (req, res) {
    console.log('Get /');
    res.send('Get /');
});

app.get('/todo', function (req, res) {
    console.log('Get todo');
    res.send('Get todo');
});
// define tables




// starting server
var server = app.listen(8080, function () {
    console.log("App listening on port 8080");
});
