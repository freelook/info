'use strict';

module.exports = function (app) {
    // Api routing
    var foursquare = require('./foursquare.server.controller');
    app.route('/foursquare').get(foursquare.get);
};