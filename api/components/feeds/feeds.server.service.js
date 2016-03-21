'use strict';

var feeds = require('./feeds.server.model');

function all(req, res) {
    var operators = {
        limit: req.query.limit || 36,
        offset: req.query.offset || 0
    };

    if (req.query.input) {
        operators.where = [
            'LOWER(input) REGEXP ?',
            decodeURIComponent(req.query.input).replace(/\s/g, '|').toLowerCase()
        ];
    }

    return feeds.all(operators)
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            res.status(404).end(err);
        });
}

function create(req, res) {
    return feeds.create(req.body)
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