'use strict';

var config = require('./config'),
    path = require('path');

module.exports = function (io) {
    config.getGlobbedFiles('./components/**/*.server.socket.js').forEach(function (routePath) {
        require(path.resolve(routePath))(io);
    });
    require('components/core/io')(io);
};
