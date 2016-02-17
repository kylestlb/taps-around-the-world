var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    All = require(__dirname + '/../models/All.js'),
    // thinky = require(__dirname + '/../models/All.js'),    
    router = express.Router();

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    All.User.get(id).run().then(function(user, err) {
        if (err) {
            console.log(err);
            return done(err);
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
            console.log(err);
            if (err) {
                console.log('error logging in');
                return done(err);
            }
            if (user.length === 0) {
                return done(null, false, {
                    message: 'Incorrect username or password.'
                });
            }
            if (!user[0].validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect username or password.'
                });
            }

            return done(null, user[0]);
        });
    }));

router.route('/')
    .post(function(req, res, next) {
        console.log('about to auth...');
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return res.status(500).send({
                    error: err
                });
            }
            if (!user) {
                return res.status(401).send({
                    error: 'Could not log in.'
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.json({
                    message: 'Logged in successfully.'
                });
            })
        })(req, res, next);
    });

module.exports = router;