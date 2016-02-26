var All = require(__dirname + '/../app/models/All.js'),
    security = require(__dirname + '/../security.js'),
    thinky = require(__dirname + '/../util/thinky.js'),
    r = thinky.r,
    jwt = require('jwt-simple'),
    moment = require('moment');

module.exports = function(req, res, next) {
    var token = (req.body && req.body.access_token) ||
        (req.query && req.query.access_token) ||
        req.headers['x-access-token'];
    if (token) {
        console.log('found a token somehow?');
        try {
            var decoded = jwt.decode(token, security.token_secret);
            All.User.get(decoded.iss).then(function(user) {
                if (decoded.exp <= Date.now()) {
                    // If expired, check reauth flag on User model.
                    // If 'true', deny entry.
                    // If 'false', refresh the token.

                    if (user.reauth) {
                        return next();
                    } else {
                        // Refresh token here
                        var expires = moment().add(1, 'minutes').valueOf();
                        token = jwt.encode({
                            iss: user.id,
                            exp: expires,
                        }, security.token_secret);
                        req.newToken = token;
                        req.user = user;
                        return next();
                    }
                }
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