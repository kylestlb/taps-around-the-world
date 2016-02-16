var thinky = require('../../util/thinky.js'),
    type = thinky.type,
    r = thinky.r;

var Bar = thinky.createModel('Bar', {
    id: type.string(),
    name: type.string(),
    createdAt: type.date().default(r.now)
});

Bar.ensureIndex('name');

module.exports = Bar;

var TapList = require(__dirname + '/TapList.js');
Bar.hasOne(TapList, 'taplist', 'id', 'barId');