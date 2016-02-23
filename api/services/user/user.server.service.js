'use strict';

var $q = require('q'),
    ref = require('../core/firebase').ref(),
    users = ref.child('users');

function init() {

    users.on('child_added', function (userSnap) {
        var user = userSnap.val();
        if (user && user.uid) {
            ref.child('looks').child(user.uid).set(100);
        }
    });

    users.on('child_removed', function (userSnap) {
        var user = userSnap.val();
        if (user && user.uid) {
            ref.child('looks').child(user.uid).remove();
        }
    });
}

function get(_id) {
    var defer = $q.defer(_id);
    return defer.promise;
}

module.exports = {
    init: init,
    get: get
};