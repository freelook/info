'use strict';

module.exports = function (ref, model, convertor) {
    var firebase_ref = require('components/core/firebase').ref(ref);
    firebase_ref.once('value').then(function (firebaseSnap) {
        firebaseSnap.forEach(function (snap) {
            if (!convertor) {
                model.create(snap.val());
            } else {
                model.create(convertor(snap));
            }
        })
    });
};
