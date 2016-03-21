'use strict';

module.exports = function (app) {
    var feeds = require('./feeds.server.controller');
    app.route('/feeds/all').get(feeds.all);
    app.route('/feeds/create').post(feeds.create);
};