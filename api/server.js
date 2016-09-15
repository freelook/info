'use strict';

// Set env
require('dotenv').config();

// Set up path for modules
require('app-module-path').addPath(__dirname);

var http = require('http'),
    config = require('components/core/config');

// Init the express application
var api = require('express')();

// Create a server
var server = http.createServer(api);

// Create socket.io
var io = require('socket.io')(server);

// Init core
require('components/core').init(api, io);

// Run api
server.listen(config.port);

// Logging initialization
console.log('freelook.info api started on port ' + config.port);
