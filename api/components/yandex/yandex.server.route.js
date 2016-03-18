'use strict';

module.exports = function (app) {
    // Api routing
    var ya = require('./yandex.server.controller');
    app.route('/yandex/market').get(ya.market);
};