'use strict';

module.exports = function(app) {
    // Api routing
    var get = require('../controllers/get');
    app.route('/get').get(get);
};
