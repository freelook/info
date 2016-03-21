'use strict';

var feeds = require('./feeds.server.service');

function all(req, res) {
    feeds.all(req, res);
}

function create(req, res) {
    feeds.create(req, res);
}

module.exports = {
    all: all,
    create: create
};
