'use strict';

var $q = require('q'),
    fb_token = require('components/facebook/facebook.server.service'),
    users_sql = require('./users.server.model'),
    feeds = require('components/feeds/feeds.server.service'),
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

function syncData(params, data) {
    if (params && data) {
        return one(params).then(function (user) {
            data.userId = user.id;
            return users_data_sql.upsert(data);
        });
    }
    return $q.reject();
}

function syncFeeds(params, data, query) {
    if (params && data && Array.isArray(data) && query) {
        return one(params)
            .then(function (user) {
                var defer = $q.defer(),
                    keys = [],
                    promises = data.map(function (item) {
                        keys.push({url: item.url});
                        return feeds.create(item);
                    });
                $q.all(promises).finally(function () {
                    return feeds.all({
                        $or: keys
                    })
                        .then(function (_data) {
                            return defer.resolve({user: user, feeds: _data});
                        })
                        .catch(function (err) {
                            return defer.reject(err);
                        });
                });
                return defer.promise;
            })
            .then(function (relations) {
                return relations.user.addFeeds(relations.feeds, {type: query.type});
            });
    }
    return $q.reject();
}

function getFeeds(params, query) {
    if (params && query) {
        return one(params).then(function (user) {
            return feeds.model.findAll({
                include: [{
                    model: users_feeds_sql,
                    attributes: [],
                    where: {type: query.type, userId: user.id}
                }]
            });
        });
    }
    return $q.reject();
}

function delFeeds(params, data, query) {
    if (params && data && Array.isArray(data) && query) {
        return one(params).then(function (user) {
            var defer = $q.defer();
            $q.all(data.map(function (item) {
                return users_feeds_sql.destroy({
                    where: {userId: user.id, feedId: item.type, type: query.type}
                });
            })).finally(function () {
                return defer.resolve();
            });
            return defer.promise;
        })
            .then(function () {
                return getFeeds(params, query);
            });
    }
    return $q.reject();
}

module.exports = {
    all: all,
    one: one,
    create: create,
    syncData: syncData,
    syncFeeds: syncFeeds,
    getFeeds: getFeeds,
    delFeeds: delFeeds
};