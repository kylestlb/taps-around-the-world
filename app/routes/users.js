var express = require('express'),
    router = express.Router(),
    All = require(__dirname + '/../models/All.js'),
    thinky = require(__dirname + '/../../util/thinky'),
    r = thinky.r,
    Query = thinky.Query,
    type = thinky.type;

// Create user
router.route('/')
    .post(function(req, res) {
        All.User.getAll(req.body.username, {
            index: 'username'
        }).run().then(function(user) {

            // User exists (results are returned in array)
            if (user.length !== 0) {
                if (user[0].validPassword(req.body.password))
                    console.log('valid pass!')
                else
                    console.log('invalid pass!')

                res.status(409).send({
                    error: 'User already exists.'
                });
                return;
            }

            // Generate hashed password
            var hash = All.User.generateHash(req.body.password);
            var user = new All.User({
                username: req.body.username,
                password: hash
            });

            user.save(function(err) {
                if (err)
                    res.status(500).send({
                        error: 'Error writing user to database.'
                    });
                res.json({
                    message: 'User created.'
                });
            });
            return;
        });
    });

// Retrieve user by ID
router.route('/:id')
    .get(function(req, res) {

    });
module.exports = router;