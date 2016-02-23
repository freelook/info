'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    http = require('http'),
    config = require('./config/config');

// Bootstrap db connection
var Firebase = require('firebase');
var ref = new Firebase(config.Firebase.ref);
ref.authWithCustomToken(config.Firebase.id);

// Init the express application
var api = require('express')();

// Create a server
var server = http.createServer(api);

// Init RED
var RED = require('node-red');
RED.init(server, config.Red);
api.use(config.Red.httpAdminRoot, RED.httpAdmin);
api.use(config.Red.httpNodeRoot, RED.httpNode);
RED.start();

// Init socket.io
var io = require('socket.io')(server);

require('./config/socket')(io);
require('./config/express')(api);
require('./services/user/user').init();

// Run api
server.listen(config.port);

// Logging initialization
console.log('freelook.info api started on port ' + config.port);
