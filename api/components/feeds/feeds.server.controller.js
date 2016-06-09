'use strict';

var $q = require('q'),
    feeds = require('./feeds.server.service');

function all(req, res) {
    feeds.findAndCountAll(req.query)
        .then(function (data) {
            res.send(data);
        })
        .catch(function () {
            res.status(404).end();
        });
}

function create(req, res) {
    feeds.create(req.body)
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
