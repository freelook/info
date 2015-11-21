'use strict';

module.exports = function (app) {
    var promo = require('../controllers/promo');
    app.route('/promo/click').get(promo.click);
};