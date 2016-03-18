'use strict';

module.exports = function (app) {
    // Api routing
    var twitter = require('./twitter.server.controller');
    app.route('/twitter').get(twitter.get);
};