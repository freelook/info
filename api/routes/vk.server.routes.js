'use strict';

module.exports = function (app) {
    // Api routing
    var vk = require('../controllers/vk');
    app.route('/vk').get(vk.query);
};