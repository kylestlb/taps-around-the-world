var thinky = require('../../util/thinky.js');
var type = thinky.type;
var r = thinky.r;

var User = thinky.createModel('User', {
	id: type.string(),
	username: type.string(),
	password: type.string(),
	createdAt: type.date().default(r.now())
});

module.exports = User;