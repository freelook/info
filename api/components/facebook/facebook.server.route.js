'use strict';

module.exports = function (app) {
    // Api routing
    var facebook = require('./facebook.server.controller');
    app.route('/facebook').get(facebook.query);
};