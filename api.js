var async = require('async'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    router = express.Router();

router.use(function(req, res, next) {
    console.log('Req sent to server at ' + Date.now());
    next();
});

router.get('/', function(req, res) {
    res.json({
        message: "Root api"
    });
});

// Hook up each router for each model / action
router.use('/beer', require('./app/routes/beer'));
router.use('/user', require('./app/routes/user'));
router.use('/login', require('./app/routes/login'));
router.use('/logout', require('./app/routes/logout'));
//router.use('/taplist',require('./taplist'))
//... etc

module.exports = router;