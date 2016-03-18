'use strict';

module.exports = function (app) {
    // Api routing
    var vk = require('./vk.server.controller');
    app.route('/vk').get(vk.query);
};