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
var api = require('express')();

// Init socket.io
var io = require('socket.io')(api.listen(config.port));

require('./config/socket')(io);
require('./services/core/io')(io);
require('./config/express')(api);

// Logging initialization
console.log('freelook.info api started on port ' + config.port);
