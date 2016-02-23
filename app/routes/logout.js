var express = require('express'),
    All = require(__dirname + '/../models/All.js'),
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
                return;
            }
            user[0].reauth = true;
            user[0].save(function(doc) {

            });
            res.status(200).json({
                message: 'Logged out.',
                token: ''
            });
            return;
        });
    });

module.exports = router;