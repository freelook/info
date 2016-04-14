'use strict';

var $q = require('q'),
    users_sql = require('./users.server.model');

function all(query) {
    return users_sql.all({
        where: query
    });
}

function create(body) {
    return users_sql.create(body);
}

module.exports = {
    all: all,
    create: create
};