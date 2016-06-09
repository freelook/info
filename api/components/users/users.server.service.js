'use strict';

var $q = require('q'),
    fb_token = require('components/facebook/facebook.server.service'),
    users_sql = require('./users.server.model'),
    users_feeds_sql = require('./feeds/users.feeds.server.model'),
    users_data_sql = require('./data/users.data.server.model');


function all(query) {
    return users_sql.all({
        where: query
    });
}

function one(query) {
    return users_sql.findOne({
        where: query
    });
}

function create(body) {
    if (body) {
        var defer = $q.defer();
        fb_token.debug(body.token)
            .then(function (debug_token) {
                var nickname = [body.first_name || 'x', body.last_name || 'x'].join('.').toLowerCase();
                return users_sql.findOrCreate({
                    where: {$and: [{facebook: debug_token.user_id}, {nickname: nickname}]},
                    defaults: {facebook: debug_token.user_id, nickname: nickname, looks: 5}
                })
                    .spread(function (user) {
                        return defer.resolve(user);
                    });
            })
            .catch(function (err) {
                return defer.reject(err);
            });
        return defer.promise;
    }
    return $q.reject();
}

function syncData(query, data) {
    if (query && data) {
        return one(query).then(function (user) {
            data.userId = user.id;
            return users_data_sql.upsert(data);
        });
    }
    return $q.reject();
}

module.exports = {
    all: all,
    one: one,
    create: create,
    syncData: syncData
};