'use strict';

module.exports = function (app) {
    // Api routing
    var wizard = require('./wizard.server.controller');
    app.route('/wizard/abracadabra').get(wizard.abracadabra);
};