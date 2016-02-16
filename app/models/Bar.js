var thinky = require('../../util/thinky.js');
var type = thinky.type;
var r = thinky.r;

var Bar = thinky.createModel('Bar' {
	id: type.string(),
	name: type.string(),
	createdAt: type.date().default(r.now)
});

Bar.ensureIndex('name');

module.exports = Bar;