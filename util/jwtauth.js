var All = require(__dirname + '/../app/models/All.js'),
	security = require(__dirname + '/../security.js'),
    jwt = require('jwt-simple');

module.exports = function(req, res, next) {
    var token = (req.body && req.body.access_token) ||
        (req.query && req.query.access_token) ||
        req.headers['x-access-token'];

    if (token) {
    	try {
    		var decoded = jwt.decode(token, security.token_secret);
    		// handle token.
    		if(decoded.exp <= Date.now()) {
    			res.end('Access token has expired.', 400);
    		}

    		All.User.get(decoded.iss).then(function(user){
    			req.user = user;
    			return next();
    		});

    	} catch (err) {
    		return next();
    	}
    } else {
    	next();
    }
}