'use strict';

var config = require('../../config/config'),
    Firebase = require('firebase');

function ref(path) {
    return new Firebase([config.Firebase.ref, path || ''].join(''));
}

module.exports = {
    ref: ref
};