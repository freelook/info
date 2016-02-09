'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    Firebase = require('firebase');

// Bootstrap db connection
var ref = new Firebase(config.Firebase.ref);
ref.authWithCustomToken(config.Firebase.id, function (error, authData) {
    console.log(authData);
});

// Init the express application
var api = require('express')();

// Init socket.io
var io = require('socket.io')(api.listen(config.port));

require('./config/socket')(io);
require('./services/core/io')(io);
require('./config/express')(api);

// Logging initialization
console.log('freelook.info api started on port ' + config.port);
