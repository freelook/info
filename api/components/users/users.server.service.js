'use strict';

var $q = require('q'),
    users = require('components/core/firebase').ref('users');

function init() {
    users.on('child_added', function (userSnap) {
        if (userSnap && !userSnap.hasChild('looks')) {
            userSnap.ref().child('looks').set(100);
        }
    });
}

module.exports = {
    init: init
};