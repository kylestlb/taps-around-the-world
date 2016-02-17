var express = require('express'),
    router = express.Router(),
    All = require(__dirname + '/../models/All.js'),
    thinky = require(__dirname + '/../../util/thinky'),
    r = thinky.r,
    Query = thinky.Query,
    type = thinky.type;


router.route('/')
    .get(function(req, res) {
        All.Beer.orderBy({
            index: 'createdAt'
        }).run().then(function(result) {
            res.send(JSON.stringify(result));
        }).error(function(error) {
            res.status(500).json({
                error: error.message
            });
        });
    })
    .post(function(req, res) {

        // Check if logged in
        if (!req.user) {
            res.status(401).json({
                error: 'Need to be logged in for this feature.'
            });
            return;
        }
        var beer = new All.Beer({
            name: req.query.name,
        });

        beer.save(function(err) {
            if (err)
                res.send(err);
            res.json({
                message: 'Beer created.'
            });
        });
    });

router.route('/:id')
    .get(function(req, res) {
        Beer.get(id).run().then(function(beer) {
            res.json({
                beer: beer
            });
        });
    });

module.exports = router;