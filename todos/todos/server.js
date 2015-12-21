var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');

mongoose.connect('mongodb://localhost/todo');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.get('/', function (req, res) {
    console.log('Get /');
    res.send('Get /');
});

app.get('/todo', function (req, res) {
    console.log('Get todo');
    res.send('Get todo');
});

var server = app.listen(8080, function () {
    console.log("App listening on port 8080");
});
