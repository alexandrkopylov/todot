var express = require('express');
var app = express();

app.get('/', function (req, res) {
    console.log('Get /');
    res.send('sss');
});

var server = app.listen(8080, function () {
    console.log("App listening on port 8080");
});
