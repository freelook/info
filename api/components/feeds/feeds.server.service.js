'use strict';

var LIMIT = 24,
    $q = require('q'),
    feeds = require('./feeds.server.model');

function all(query) {
    var operators = {
        limit: LIMIT,
        offset: LIMIT * query.page || 0,
        order: 'createdAt DESC',
        where: {
            l: query.l || 'us'
        }
    };

    if (query.input) {
        operators.where.input = {
            $like: ['%',
                decodeURIComponent(query.input).trim().replace(/\s/g, '%'),
                '%'].join('')
        };
    }

    return feeds.findAndCountAll(operators);
}

function create(body) {
    var defer = $q.defer();
    feeds.findOrCreate({where: {url: body.url}, defaults: body})
        .spread(function (feed, created) {
            if (!created) {
                return feed.update({
                    count: ++feed.count
                })
                    .then(defer.resolve)
                    .catch(defer.reject);
            }
            return defer.resolve(feed);
        })
        .catch(defer.reject);
    return defer.promise;
}

module.exports = {
    all: all,
    create: create
};