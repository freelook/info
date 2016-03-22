'use strict';

var LIMIT = 24,
    feeds = require('./feeds.server.model');

function all(query) {
    var operators = {
        limit: LIMIT,
        offset: LIMIT * query.page || 0
    };

    if (query.input) {
        operators.where = [
            'LOWER(input) REGEXP ?',
            decodeURIComponent(query.input).trim().replace(/\s/g, '|').toLowerCase()
        ];
    }

    return feeds.all(operators);
}

function create(body) {
    return feeds.create(body);
}

module.exports = {
    all: all,
    create: create
};