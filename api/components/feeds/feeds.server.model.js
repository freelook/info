'use strict';

var sql = require('components/core/sql'),
    feeds = sql.define('feeds', {
        content: sql.constructor.STRING,
        img: sql.constructor.STRING,
        input: {
            type: sql.constructor.STRING,
            allowNull: false
        },
        l: sql.constructor.STRING,
        sub: sql.constructor.STRING,
        title: sql.constructor.STRING,
        type: sql.constructor.STRING,
        url: {
            type: sql.constructor.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        indexes: [{
            fields: ['input']
        }]
    });

feeds.sync();

module.exports = feeds;