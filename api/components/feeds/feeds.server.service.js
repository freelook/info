'use strict';

var LIMIT = 24,
    ORDERS = {
        popular: 'count',
        newest: 'createdAt'
    },
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
            [ORDERS[query.order] || ORDERS.newest, 'DESC']
        ]
    };

    if (query.input) {
        var like = {$like: ['%', decodeURIComponent(query.input).trim().replace(/\s/g, '%'), '%'].join('')};
        operators.where.$or = [{input: like}, {title: like}, {content: like}];
    }

    return feeds_sql.findAndCountAll(operators);
}

function create(body, params) {
    if (body && body.url) {
        var defer = $q.defer();
        feeds_sql.findOrCreate({where: {url: body.url}, defaults: body})
            .spread(function (feed, created) {
                var _params = params || {};
                if (!(created || _params.noCount)) {
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
    return $q.reject();
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