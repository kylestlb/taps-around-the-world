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
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    All = require('./app/models/All.js'),
    session = require('express-session');

app.use(helmet());

// Enable cors for dev
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cookieParser());

// Un comment when ready to ramp up Passport stuff
app.use(session({
    secret: 'beersecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Serve up index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
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