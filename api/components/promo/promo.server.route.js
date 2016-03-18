'use strict';

module.exports = function (app) {
    var promo = require('./promo.server.controller');
    app.route('/promo/click').get(promo.click);
};