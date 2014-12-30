'use strict';

module.exports = function(app) {
    // Api routing
    var api = require('../../app/controllers/api');
    app.route('/api/get').get(api.get);
};
