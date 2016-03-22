'use strict';

var feeds = require('./feeds.server.model');

function all(query) {
    var operators = {
        limit: query.limit || 36,
        offset: query.offset || 0
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