var express = require('express');
var router = express.Router();
var All = require(__dirname + '/../models/All.js');
var thinky = require(__dirname + '/../../util/thinky');
var r = thinky.r;
var Query = thinky.Query;
var type = thinky.type;


router.route('/')
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

router.route('/:id')
.get(function(req, res){
    Beer.get(id).run().then(function(beer){
        res.json({
            beer: beer
        });
    });
});

module.exports = router;