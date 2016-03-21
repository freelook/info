'use strict';

module.exports = function (ref, model) {
    var firebase_ref = require('components/core/firebase').ref(ref);
    firebase_ref.once('value').then(function (firebaseSnap) {
        firebaseSnap.forEach(function (snap) {
            model.create(snap.val());
        })
    });
};
