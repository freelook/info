'use strict';

module.exports = function (app) {
    // Api routing
    var facebook = require('../controllers/facebook');
    app.route('/facebook').get(facebook.query);
};