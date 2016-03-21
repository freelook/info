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

function all(req, res) {
    return users_sql.all({
        where: req.query
    })
        .then(function (data) {
            res.send(data);
        })
        .catch(function () {
            res.status(404).end();
        });
}

function create(req, res) {
    return users_sql.create(req.boby)
        .then(function (data) {
            res.send(data);
        })
        .catch(function () {
            res.status(404).end();
        });
}

module.exports = {
    init: init,
    all: all,
    create: create
};