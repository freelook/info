'use strict';

var users = require('./users.server.service');

function all(req, res) {
    users.all(req.query)
        .then(function (data) {
            res.send(data);
        })
        .catch(function () {
            res.status(404).end();
        });
}

function create(req, res) {
    users.create(req.body)
        .then(function (data) {
            res.send(data);
        })
        .catch(function () {
            res.status(404).end();
        });
}

module.exports = {
    all: all,
    create: create
};
