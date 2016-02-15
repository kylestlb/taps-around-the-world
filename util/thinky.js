var config = require('../config.js');
var thinky = require('thinky')(config.rethinkdb);
module.exports = thinky;