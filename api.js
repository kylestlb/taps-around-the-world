var async = require('async');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var config = require(__dirname + '/config.js');

var thinky = require(__dirname + '/util/thinky.js');
var r = thinky.r;
var Query = thinky.Query;
var type = thinky.type;

var All = require(__dirname + '/app/models/All.js');

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

router.route('/beers')
    .get(function(req, res) {
        All.Beer.orderBy({
            index: 'createdAt'
        }).run().then(function(result) {
            res.send(JSON.stringify(result));
        }).error(function(error) {
            res.send(500, {
                error: error.message
            });
        });
    })
    .post(function(req, res) {
        var beer = new All.Beer({
            name: req.query.name,
        });

        beer.save(function(err) {
            if (err)
                res.send(err);
            res.json({
                message: 'beer created.'
            });
        });
    });

router.route('/beers/:id')
.get(function(req, res){
    Beer.get(id).run().then(function(beer){
        res.json({
            beer: beer
        });
    });
});

module.exports = router;