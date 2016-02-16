var express = require('express');
router = express.Router(),
All = require(__dirname + '/../models/All.js'),
thinky = require(__dirname + '/../../util/thinky'),
r = thinky.r,
Query = thinky.Query,
type = thinky.type,
validator = require('validator');


router.route('/')
    .post(function(req, res) {
        var user = new All.User({
            username: 'testuser',
            password: 'testpw'
        });
        res.json({
            message: user.validPassword('i c u')
        });
    });

router.route('/:id')
	.get(function(req, res){

	});


module.exports = router;