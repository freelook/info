'use strict';

module.exports = function (app) {
    // Api routing
    var adwizard = require('./adwizard.server.controller');
    app.route('/adwizard/abracadabra').get(adwizard.abracadabra);
};