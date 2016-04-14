'use strict';

var sql = require('components/core/sql'),
    users = sql.define('users', {
        facebook: {
            type: sql.constructor.STRING,
            unique: true
        },
        looks: sql.constructor.INTEGER
    }, {
        indexes: [{
            fields: ['facebook']
        }]
    });

users.sync();

module.exports = users;