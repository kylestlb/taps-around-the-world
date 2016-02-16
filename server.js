var async = require('async');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Serve up index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/api', require(__dirname + '/api.js'));

var port = process.env.PORT || 8080;
app.listen(port);
console.log('listening on port ' + port);