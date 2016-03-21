'use strict';

module.exports = function (app) {
    var users = require('./users.server.controller');
    app.route('/users/all').get(users.all);
    app.route('/users/create').get(users.create);
};