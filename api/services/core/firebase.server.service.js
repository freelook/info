'use strict';

var config = require('../../config/config'),
    Firebase = require('firebase');

function ref(path) {
    return new Firebase([config.Firebase.ref, path || ''].join(''));
}

function init() {
    ref().authWithCustomToken(config.Firebase.id);
}

module.exports = {
    ref: ref,
    init: init
};