var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    All = require(__dirname + '/../models/All.js'),
    router = express.Router();

router.route('/')
	.post(function(req, res, next) {
		req.logout();
		res.status(200).json({
			message: 'Logged out.'
		});
	});

module.exports = router;