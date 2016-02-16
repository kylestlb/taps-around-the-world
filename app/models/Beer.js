var thinky = require('../../util/thinky.js');
var type = thinky.type;
var r = thinky.r;

var Beer = thinky.createModel("Beer", {
    id: type.string(),
    name: type.string(),
    createdAt: type.date().default(r.now)
    // barId: type.string(),
    // approvals: [{
    // 	id: type.string(),
    // 	username: type.string()
    // }]
});

Beer.ensureIndex("createdAt");

module.exports = Beer;