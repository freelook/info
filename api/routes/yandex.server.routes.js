'use strict';

module.exports = function (app) {
    // Api routing
    var ya = require('../controllers/yandex');
    app.route('/yandex/market').get(ya.market);
};