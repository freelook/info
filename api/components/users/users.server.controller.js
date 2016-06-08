'use strict';

var users = require('./users.server.service'),
    jwt = require('jwt-simple'),
    secret = process.env.FB_SECRET;

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
            res.cookie('user', jwt.encode(data.id, secret), {httpOnly: true});
            res.send(data);
        })
        .catch(function (err) {
            res.status(404).json(err);
        });
}

module.exports = {
    all: all,
    create: create
};
