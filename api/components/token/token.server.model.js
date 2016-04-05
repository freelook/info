'use strict';

var sql = require('components/core/sql'),
    tokens = sql.define('tokens', {
        type: {
            type: sql.constructor.STRING,
            unique: true,
            allowNull: false
        },
        token: {
            type: sql.constructor.STRING,
            allowNull: false
        },
        expire: sql.constructor.STRING
    }, {
        indexes: [{
            fields: ['type']
        }]
    });

tokens.sync();

module.exports = tokens;