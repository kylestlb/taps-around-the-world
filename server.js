var fs = require('fs'),
    https = require('https'),
    async = require('async'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    helmet = require('helmet');



app.use(helmet());

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


// Add HTTPS when app is ready to hit the wild
// 
// https.createServer({
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// }, app).listen(8080);
