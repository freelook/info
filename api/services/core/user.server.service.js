'use strict';

var $q = require('q'),
    users = require('../core/firebase').ref('users');

function init() {
    users.on('child_added', function (userSnap) {
        if (userSnap) {
            userSnap.ref().child('looks').set(100);
        }
    });
}

module.exports = {
    init: init
};