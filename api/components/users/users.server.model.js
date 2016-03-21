'use strict';

var sql = require('components/core/sql'),
    users = sql.define('users', {
        token: {
            type: sql.constructor.STRING,
            unique: true,
            allowNull: false
        },
        looks: sql.constructor.INTEGER
    }, {
        indexes: [{
            fields: ['token']
        }]
    });

users.sync();

module.exports = users;