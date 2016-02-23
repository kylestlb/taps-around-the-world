var fs = require('fs'),
    https = require('https'),
    async = require('async'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    helmet = require('helmet'),
    morgan = require('morgan'),
    All = require('./app/models/All.js'),
    jwt = require('jwt-simple');

// app.use(helmet());
// 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});// 

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(morgan('dev'));

// Serve up index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/api', require(__dirname + '/api.js'));

var port = process.env.PORT || 8080;
app.listen(port);


// Add HTTPS when app is ready to hit the wild
// 
// https.createServer({
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// }, app).listen(8080);