'use strict';

module.exports = function (app) {
    // Api routing
    var goods = require('../controllers/goods');
    app.route('/goods').get(goods);
};