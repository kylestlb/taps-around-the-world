var express = require('express'),
    router = express.Router(),
    All = require(__dirname + '/../models/All.js');

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

                res.status(409).json({
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
                    res.status(500).json({
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
        All.User.get(req.params.id).run().then(function(user) {
        	// do nothing yet
        });
    });



module.exports = router;