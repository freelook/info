'use strict';

var LIMIT = 24,
    $q = require('q'),
    feeds_sql = require('./feeds.server.model'),
    users_sql = require('components/users/users.server.model'),
    users_feeds_sql = require('components/users/feeds/users.feeds.server.model');

function all(query) {
    return feeds_sql.all({
        where: query
    });
}

function findAndCountAll(query) {
    var operators = {
        limit: LIMIT,
        offset: LIMIT * query.page || 0,
        where: {
            l: query.l || 'us'
        },
        include: [{
            model: users_feeds_sql,
            attributes: ['userId'],
            include: [{
                model: users_sql,
                attributes: ['nickname', 'facebook']
            }]
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    };

    if (query.input) {
        operators.where.input = {
            $like: ['%',
                decodeURIComponent(query.input).trim().replace(/\s/g, '%'),
                '%'].join('')
        };
    }

    return feeds_sql.findAndCountAll(operators);
}

function create(body) {
    var defer = $q.defer();
    feeds_sql.findOrCreate({where: {url: body.url}, defaults: body})
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

function bulk(feeds) {
    return feeds_sql.bulkCreate(feeds);
}

module.exports = {
    all: all,
    findAndCountAll: findAndCountAll,
    create: create,
    bulk: bulk,
    model: feeds_sql
};