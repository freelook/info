'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    http = require('http'),
    config = require('./config/config');

// Init the express application
var api = require('express')();

// Create a server
var server = http.createServer(api);

// Create socket.io
var io = require('socket.io')(server);

// Init core
require('./services/core').init(server, api, io);

// Config api
require('./config')(api, io);

// Run api
server.listen(config.port);

// Logging initialization
console.log('freelook.info api started on port ' + config.port);
