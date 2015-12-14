'use strict';

module.exports = function (app) {
    // Api routing
    var twitter = require('../controllers/twitter');
    app.route('/twitter').get(twitter.get);
};