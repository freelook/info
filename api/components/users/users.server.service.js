'use strict';

var $q = require('q'),
    users = require('components/core/firebase').ref('users'),
    users_sql = require('./users.server.model');

function init() {
    users.on('child_added', function (userSnap) {
        if (userSnap && !userSnap.hasChild('looks')) {
            userSnap.ref().child('looks').set(100);
        }
    });
}

function all(query) {
    return users_sql.all({
        where: query
    });
}

function create(body) {
    return users_sql.create(body);
}

module.exports = {
    init: init,
    all: all,
    create: create
};