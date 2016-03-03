'use strict';

var $q = require('q'),
    jwt = require('jwt-simple'),
    users = require('../core/firebase').ref('users'),
    promos = require('../core/firebase').ref('promos'),
    config = require('../../config/config');

function init() {
    promos.on('child_added', function (promoSnap) {
        if (promoSnap.hasChild('user')) {
            users.child(promoSnap.child('user').val()).child('looks').once('value')
                .then(function (looksSnap) {
                    var looks = +looksSnap.val() - promoSnap.child('amount').val() * promoSnap.child('price').val();
                    if (looks >= 0) {
                        return looksSnap.ref().set(looks);
                    }
                    return $q.reject();
                })
                .then(function () {
                    return promoSnap.child('user').ref().remove();
                })
                .catch(function () {
                    promoSnap.ref().remove();
                });
        }
    });
    promos.on('child_changed', function (promoSnap) {
        if (+promoSnap.child('amount').val() <= 0) {
            promoSnap.ref().remove();
        }
    });
}

function click(data) {
    var defer = $q.defer(),
        user = jwt.decode(data.token, config.Firebase.id);
    if (user && user.d && user.d.uid) {
        promos.child(data.id).once('value')
            .then(function (_promo) {
                return _promo;
            })
            .then(function (_promo) {
                return users.child(user.d.uid).once('value')
                    .then(function (_usr) {
                        return {usr: _usr, promo: _promo};
                    });
            })
            .then(function (data) {
                if (data.promo.child('users').hasChild(data.usr.key())) {
                    return $q.reject();
                }
                var update = {
                    amount: +data.promo.child('amount').val() - 1,
                    users: {}
                };
                update.users[data.usr.key()] = true;
                return data.promo.ref().update(update)
                    .then(function () {
                        return data;
                    });
            })
            .then(function (data) {
                return data.usr.ref().child('looks')
                    .set(+data.usr.child('looks').val() + data.promo.child('price').val())
                    .then(function () {
                        return data.promo.child('url').val();
                    });
            })
            .then(function (_url) {
                defer.resolve(_url);
            })
            .catch(function (err) {
                defer.reject(err);
            });

    } else {
        defer.reject();
    }

    return defer.promise;
}


module.exports = {
    init: init,
    click: click
};