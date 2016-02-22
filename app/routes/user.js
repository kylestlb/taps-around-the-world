var express = require('express'),
    router = express.Router(),
    All = require(__dirname + '/../models/All.js'),
    config = require(__dirname + '/../../config.js');

// Create user
router.route('/')
    .post(function(req, res) {
        All.User.getAll(req.body.username, {
            index: 'username'
        }).run().then(function(user) {

            // User exists (results are returned in array)
            if (user.length !== 0) {
                res.status(409).json({
                    error: 'Username already exists.'
                });

            } else {

                // Generate hashed password
                All.User.generateHash(req.body.password)
                    .then(function(result) {
                        var user = new All.User({
                            username: req.body.username,
                            password: result
                        });

                        user.save(function(err) {
                            if (err)
                                res.status(500).json({
                                    error: 'Error writing user to database: ' + err
                                });
                            else
                                res.status(200).json({
                                    message: 'User created.'
                                });
                        });
                        return;
                    });
            }

        });
    });

// Retrieve user by ID
router.route('/:id')
    .get(function(req, res) {
        All.User.get(req.params.id).run().then(function(user) {
            // do nothing yet
        });
    });



module.exports = router;