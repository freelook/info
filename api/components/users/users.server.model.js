'use strict';

var sql = require('components/core/sql'),
    users = sql.define('users', {
        nickname: {
            type: sql.constructor.STRING,
            unique: true
        },
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