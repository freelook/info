'use strict';

module.exports = function (app) {
    // Api routing
    var instagram = require('../controllers/instagram');
    app.route('/instagram').get(instagram.query);
};