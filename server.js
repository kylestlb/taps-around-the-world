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
    session = require('express-session');

app.use(helmet());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// Un comment when ready to ramp up Passport stuff
// app.use(session({
//     secret: 'beersessionsecret'
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


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