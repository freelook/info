'use strict';

module.exports = function (app) {
    // Api routing
    var facebook = require('../controllers/facebook');
    app.route('/facebook/search').get(facebook.search);
};