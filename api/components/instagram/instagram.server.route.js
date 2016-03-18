'use strict';

module.exports = function (app) {
    // Api routing
    var instagram = require('./instagram.server.controller');
    app.route('/instagram').get(instagram.query);
};