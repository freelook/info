'use strict';

// Set up path for modules
require('app-module-path').addPath(__dirname);

// Api dependencies
var init = require('config/init')(),
    http = require('http'),
    config = require('config/config');

// Init the express application
var api = require('express')();

// Create a server
var server = http.createServer(api);

// Create socket.io
var io = require('socket.io')(server);

// Init core
require('components/core/core.server.service').init(server, api, io);

// Config api
require('config/index')(api, io);

// Run api
server.listen(config.port);

// Logging initialization
console.log('freelook.info api started on port ' + config.port);
