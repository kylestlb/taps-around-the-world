var async = require('async');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Req sent to server at ' + Date.now());
    next();
});

router.get('/', function(req, res) {
    res.json({
        message: "Root api"
    });
});

// Hook up each router for each model
router.use('/beers',require('./app/routes/beers'));
router.use('/users',require('./app/routes/users'));
//router.use('/taplist',require('./taplist'))
//... etc

module.exports = router;