var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)



mongoose.connect('mongodb://localhost/todo');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('OpenDatabase');
});

var Todo = mongoose.model('Todo', {
    text: String
});

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

app.post('/api/todos', function (req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        done: false
    }, function (err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function (err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function (req, res) {
    Todo.remove({
        _id: req.params.todo_id
    }, function (err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function (err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

app.get('*', function (req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// starting server
var server = app.listen(8080, function () {
    console.log("App listening on port 8080");
});
