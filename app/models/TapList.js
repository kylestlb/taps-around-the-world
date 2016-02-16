var thinky = require('../../util/thinky.js');
var type = thinky.type;
var r = thinky.r;

var TapList = thinky.createModel('TapList', {
    id: type.string(),
    createdAt: type.date().default(r.now)
});

module.exports = TapList;

var Bar = require(__dirname + '/Bar.js');
TapList.belongsTo(Bar, 'bar', 'barId', 'id');