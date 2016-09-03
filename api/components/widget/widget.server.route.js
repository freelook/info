'use strict';

module.exports = function (app) {
    // Api routing
    var widget = require('./widget.server.controller');
    app.route('/widget/render').post(widget.render);
};