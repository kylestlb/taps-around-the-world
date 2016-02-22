var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    All = require(__dirname + '/../models/All.js'),
    router = express.Router();

passport.serializeUser(function(user, done) {
    console.log('serializing');
    console.log(user.id);
    done(null, user.id);
});

// Resurrect with ID only
passport.deserializeUser(function(id, done) {
    All.User.get(id).run().then(function(user, err) {
        if (err) {
             done(err);
             return;
        }
        done(err, user);
    });
});

// Strategy for login
passport.use(new LocalStrategy(
    function(username, password, done) {
        All.User.getAll(username, {
            index: 'username'
        }).run().then(function(user, err) {
            if (err) {
                var debugInfo = config.debug ? ' ' + err : '';
                return done(debugInfo);
            }
            if (user.length === 0) {
                return done(null, false, {
                    message: 'Incorrect username or password.'
                });
            }
            user[0].checkPassword(password).then(function(result) {
                if (result)
                    return done(null, user[0]);
                else
                    return done(null, false, {
                        message: 'Incorrect username or password.'
                    });
            }).catch(function(err) {
                var debugInfo = config.debug ? ' ' + err : '';
                return done('Error logging in.' + debugInfo);
            });
        });
    }));

router.route('/')
    .post(function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            if (!user) {
                return res.status(401).json({
                    error: info
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({
                    message: 'Logged in successfully.'
                });
            })
        })(req, res, next);
    });

module.exports = router;