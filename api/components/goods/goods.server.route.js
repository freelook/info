'use strict';

module.exports = function (app) {
    // Api routing
    var goods = require('./goods.server.controller');
    app.route('/goods').get(goods);
};