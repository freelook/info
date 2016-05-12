'use strict';

module.exports = function (app) {
    var feeds = require('./feeds.server.controller');
    app.route('/feeds').get(feeds.all);
    app.route('/feeds').post(feeds.create);
};