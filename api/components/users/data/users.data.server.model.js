'use strict';

var sql = require('components/core/sql'),
    users = require('components/users/users.server.model'),
    users_data = sql.define('users_data', {
        looks: sql.constructor.TEXT,
        stars: sql.constructor.TEXT,
        subscription: sql.constructor.TEXT,
        userId: {
            type: sql.constructor.INTEGER,
            unique: true,
            allowNull: false
        }
    });

users_data.belongsTo(users);

users_data.sync();

module.exports = users_data;