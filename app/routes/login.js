var express = require('express'),
    app = express(),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    All = require(__dirname + '/../models/All.js'),
    moment = require('moment'),
    jwt = require('jwt-simple'),
    security = require(__dirname + '/../../security.js'),
    router = express.Router();

router.route('/')
    .post(function(req, res, next) {
        All.User.getAll(req.body.username, {
            index: 'username'
        }).run().then(function(user, err) {
            if (err) {
                var debugInfo = config.debug ? ' ' + err : '';
                res.status(500).json({
                    error: debugInfo
                });
            }
            if (user.length === 0) {
                res.status(401).json({
                    message: 'Incorrect username or password.'
                });
            }
            user[0].checkPassword(req.body.password).then(function(result) {
                if (result) {
                    var expires = moment().add(7, 'days').valueOf();
                    var token = jwt.encode({
                        iss: user[0].id,
                        exp: expires
                    }, security.token_secret);
                    res.status(200).json({
                        token: token,
                        expires: expires,
                        user: user[0]
                    });
                } else {
                    res.status(401).json({
                        message: 'Incorrect username or password.'
                    });
                }
            }).catch(function(err) {
                var debugInfo = config.debug ? ' ' + err : '';
                res.status(500).json({
                    error: 'Error logging in. ' + debugInfo
                });
            });
        });
    });

module.exports = router;