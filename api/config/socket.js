'use strict';

var config = require('./config'),
    path = require('path');

module.exports = function(io) {
    config.getGlobbedFiles('./sockets/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(io);
    });
};
