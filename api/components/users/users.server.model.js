'use strict';

var sql = require('components/core/sql'),
    users = sql.define('users', {
        token: sql.constructor.STRING,
        looks: sql.constructor.INTEGER
    });

users.sync();

module.exports = users;