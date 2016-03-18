'use strict';

var config = require('config/config'),
    RED = require('node-red');

function init(server, api) {
    RED.init(server, config.Red);
    api.use(config.Red.httpAdminRoot, RED.httpAdmin);
    api.use(config.Red.httpNodeRoot, RED.httpNode);
    RED.start();
}

module.exports = {
    init: init
};