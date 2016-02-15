var async = require('async');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var config = require(__dirname + '/config.js');
var thinky = require(__dirname + '/util/thinky.js');
var r = thinky.r;
var type = thinky.type;
var All = require(__dirname + '/app/models/All.js');

	

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



var router = express.Router();

// Serve up index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

router.get('/', function(req, res) {
    res.json({
        message: "Root api"
    });
});


app.use('/api', router);

var port = process.env.PORT || 8080;
app.listen('8081');



// Example RDB boilerplate if we don't end up using THINKY
// 
// function start(connection) {
//     app._rdbConn = connection;

//     console.log('Starting server on port ') + port;
// }


/*
 * Connect to rethinkdb, create the needed tables/indexes and then start express.
 * Create tables/indexes then start express
 */
/*async.waterfall([

    function connect(callback) {
        r.connect(config.rethinkdb, callback);
    },
    function createDatabase(connection, callback) {
        //Create the database if needed.
        r.dbList().contains(config.rethinkdb.db).do(function(containsDb) {
            return r.branch(
                containsDb, {
                    created: 0
                },
                r.dbCreate(config.rethinkdb.db)
            );
        }).run(connection, function(err) {
            callback(err, connection);
        });
    },
    function createTable(connection, callback) {
        //Create the table if needed.
        r.tableList().contains('beers').do(function(containsTable) {
            return r.branch(
                containsTable, {
                    created: 0
                },
                r.tableCreate('beers')
            );
        }).run(connection, function(err) {
            callback(err, connection);
        });
    },
    function createIndex(connection, callback) {
        //Create the index if needed.
        r.table('beers').indexList().contains('createdAt').do(function(hasIndex) {
            return r.branch(
                hasIndex, {
                    created: 0
                },
                r.table('beers').indexCreate('createdAt')
            );
        }).run(connection, function(err) {
            callback(err, connection);
        });
    },
    function waitForIndex(connection, callback) {
        //Wait for the index to be ready.
        r.table('beers').indexWait('createdAt').run(connection, function(err, result) {
            callback(err, connection);
        });
    }
], function(err, connection) {
    if (err) {
        console.error(err);
        process.exit(1);
        return;
    }

    start(connection);
});*/