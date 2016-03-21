'use strict';

var users = require('./users.server.service');

function all(req, res) {
    users.all(req, res);
}

function create(req, res) {
    users.create(req, res);
}

module.exports = {
    all: all,
    create: create
};
