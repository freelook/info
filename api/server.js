'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    Parse = require('parse').Parse;

// Bootstrap db connection
Parse.initialize(config.Parse.id, config.Parse.js, config.Parse.master);
Parse.Cloud.useMasterKey();

// Init the express application
var app = require('./config/express')();

// Init server
var server = require('http').Server(app);

// Init socket.io
var io = require('socket.io')(server);
require('./config/socket')(io);

// Start the app by listening on <port>
server.listen(config.port);

// Logging initialization
console.log('freelook.info api started on port ' + config.port);
