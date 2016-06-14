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

function one(req, res) {
    users.one(req.params, req.query)
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

function syncData(req, res) {
    users.syncData({
        id: jwt.decode(req.cookies.user, secret),
        nickname: req.params.nickname
    }, req.body)
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            res.status(404).json(err);
        });
}

function syncFeeds(req, res) {
    users.syncFeeds({
        id: jwt.decode(req.cookies.user, secret),
        nickname: req.params.nickname
    }, req.body, req.query)
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            res.status(404).json(err);
        });
}

function getFeeds(req, res) {
    users.getFeeds({
        nickname: req.params.nickname
    }, req.query)
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            res.status(404).json(err);
        });
}

function delFeeds(req, res) {
    users.delFeeds({
        id: jwt.decode(req.cookies.user, secret),
        nickname: req.params.nickname
    }, req.body, req.query)
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            res.status(404).json(err);
        });
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
