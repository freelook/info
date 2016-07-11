'use strict';

var users = require('./users.server.service'),
    token = require('./users.token.server.service');


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
    var params = !req.query.local ? req.params : {
        id: token.decode(req.cookies.user),
        nickname: req.params.nickname
    };
    users.one(params)
        .then(function (data) {
            return res.send(data);
        })
        .catch(function () {
            res.status(404).end();
        });
}

function create(req, res) {
    users.create(req.body)
        .then(function (data) {
            res.cookie('user', token.encode(data.id), {httpOnly: true, expires: new Date(11235813213455)});
            res.send(data);
        })
        .catch(function (err) {
            res.status(404).json(err);
        });
}

function clear(req, res) {
    res.clearCookie('user');
    res.status(200).end();
}

function syncData(req, res) {
    users.syncData({
        id: token.decode(req.cookies.user),
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
        id: token.decode(req.cookies.user),
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

function delFeed(req, res) {
    users.delFeed({
        id: token.decode(req.cookies.user),
        nickname: req.params.nickname
    }, req.params.feedId, req.query)
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
    clear: clear,
    syncData: syncData,
    syncFeeds: syncFeeds,
    getFeeds: getFeeds,
    delFeed: delFeed
};
