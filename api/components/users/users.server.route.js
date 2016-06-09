'use strict';

module.exports = function (app) {
    var users = require('./users.server.controller');
    app.route('/users').get(users.all);
    app.route('/users/:nickname').get(users.one);
    app.route('/users').post(users.create);
    app.route('/users/:nickname/data').post(users.syncData);
};