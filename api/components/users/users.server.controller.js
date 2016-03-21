'use strict';

var users = require('./users.server.model');

function all(req, res) {
    users.all({
        where: req.query
    })
        .then(function (data) {
            res.send(data);
        });
}

function create(req, res) {
    users.create({
        token: req.query.token
    })
        .then(function (data) {
            res.send(data);
        });
}

module.exports = {
    all: all,
    create: create
};
