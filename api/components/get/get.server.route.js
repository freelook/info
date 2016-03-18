'use strict';

module.exports = function (app) {
    // Api routing
    var getController = require('./get.server.controller');
    app.route('/get').get(getController);
};
