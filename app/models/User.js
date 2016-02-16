var thinky = require('../../util/thinky.js');
type = thinky.type,
r = thinky.r,
validator = require('validator'),
bcrypt = require('bcryptjs');

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

User.ensureIndex('username');

User.define('validPassword', function(password) {
	console.log(password);
    return bcrypt.compareSync(password, this.password);
});

User.defineStatic('generateHash', function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
});

module.exports = User;