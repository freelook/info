'use strict';

var $q = require('q'),
    fb_token = require('components/facebook/facebook.server.service'),
    users_sql = require('./users.server.model');

function all(query) {
    return users_sql.all({
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

module.exports = {
    all: all,
    create: create
};