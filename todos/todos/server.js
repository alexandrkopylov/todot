var express = require('express');
var app = express();

app.get('/', function (req, res) {
    console.log('Get /');
    res.send('sss');
});

app.get('/todo', function (req, res) {
    console.log('Get todo');
    res.send('get todo');
});

var server = app.listen(8080, function () {
    console.log("App listening on port 8080");
});
