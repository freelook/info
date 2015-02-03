'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    db;

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
//var db = ***;

// Init the express application
var app = require('./config/express')(db);

// Init server
var server = require('http').Server(app);

// Init socket.io
var io = require('socket.io')(server);
require('./config/socket')(io);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
server.listen(config.port);

// Logging initialization
console.log('freelook api started on port ' + config.port);
