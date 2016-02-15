var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// Serve up index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.get('/', function(req, res) {
    res.json({
        message: "Root api"
    });
});

app.use('/api', router);



app.listen(port);
console.log('Starting server on port ') + port);