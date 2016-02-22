var thinky = require('../../util/thinky.js'),
    type = thinky.type,
    r = thinky.r;

var TapList = thinky.createModel('TapList', {
    id: type.string(),
    createdAt: type.date().default(r.now)
});

module.exports = TapList;

var Bar = require(__dirname + '/Bar.js');
var Beer = require(__dirname + '/Beer.js');

TapList.belongsTo(Bar, 'bar', 'barId', 'id');
TapList.hasAndBelongsToMany(Beer, 'beers', 'id', 'id');
Beer.hasAndBelongsToMany(TapList, 'taplists', 'id', 'id');