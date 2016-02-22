var thinky = require('../../util/thinky.js'),
    type = thinky.type,
    r = thinky.r;

var Beer = thinky.createModel("Beer", {
    id: type.string(),
    name: type.string(),
    createdAt: type.date().default(r.now),
    brewery: type.string()
    // barId: type.string(),
    // approvals: [{
    // 	id: type.string(),
    // 	username: type.string()
    // }]
});

Beer.ensureIndex("createdAt");

module.exports = Beer;