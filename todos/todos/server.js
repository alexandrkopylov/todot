var express = require('express');
var app = express();

app.get('/', function (req, res) {
  console.log('Get /')
});
app.listen(8080)
console.log("App listening on port 8080");