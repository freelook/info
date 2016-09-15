'use strict';

module.exports = function (app) {
    // Api routing
    var widget = require('./widgets.server.controller');
    app.route('/widgets/render').post(widget.render);
};