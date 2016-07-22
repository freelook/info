'use strict';

module.exports = function (app) {
    // Api routing
    var controller = require('./get.server.controller');
    app.route('/get').get(controller.get);
    app.route('/get/atob').get(controller.atob);
};
