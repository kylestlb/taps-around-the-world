var thinky = require('../../util/thinky.js');
type = thinky.type,
r = thinky.r,
bcrypt = require('bcryptjs'),
validator = require('validator');

var fn = function(pw) {
    console.log(pw);
    return true;
};

var User = thinky.createModel('User', {
    id: type.string(),
    username: type.string(),
    password: type.string(),
    createdAt: type.date().default(r.now())
});

User.define('validPassword', function(password) {
    return password;
});

module.exports = User;