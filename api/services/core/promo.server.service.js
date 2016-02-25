'use strict';

var $q = require('q'),
    jwt = require('jwt-simple'),
    users = require('../core/firebase').ref('users'),
    shows = require('../core/firebase').ref('shows'),
    config = require('../../config/config');

function click(data) {
    var defer = $q.defer(),
        user = jwt.decode(data.token, config.Firebase.id);
    if (user && user.d && user.d.uid) {
        shows.child(data.id).once('value')
            .then(function (_show) {
                return _show;
            })
            .then(function (_show) {
                return users.child(user.d.uid).once('value')
                    .then(function (_usr) {
                        return {usr: _usr, show: _show};
                    });
            })
            .then(function (data) {
                return data.usr.ref().child('looks')
                    .set(+data.usr.child('looks').val() + data.show.child('price').val())
                    .then(function () {
                        return data;
                    });
            })
            .then(function (data) {
                return data.show.ref().child('users').child(data.usr.key()).set(true)
                    .then(function () {
                        return data.show.child('url').val();
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
    click: click
};