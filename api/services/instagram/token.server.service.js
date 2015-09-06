'use strict';

var $http = require('request'),
    phantom = require('phantom'),
    $q = require('q'),
    Parse = require('parse').Parse,
    API = Parse.Object.extend('API'),
    query = new Parse.Query(API),
    id = process.env.INSTAGRAM_ID,
    pass = process.env.INSTAGRAM_PASS,
    instagram_token = '';


function _storeToken(api, token) {
    var defer = $q.defer();
    instagram_token = token;
    api.set('name', 'token');
    api.set('instagram', {
        token: token,
        expire: 0
    });

    api.save()
        .then(function () {
            return defer.resolve(token);
        }, function (err) {
            return defer.reject(err);
        });

    return defer.promise;
}

function _getToken() {
    var defer = $q.defer();

    phantom.create(function (ph) {
        ph.createPage(function (page) {
            var url = 'https://instagram.com/oauth/authorize/?client_id=' + id + '&redirect_uri=http://freelook.info&response_type=token';

            page.set('onUrlChanged', function (targetUrl) {
                if (/#access_token=/.test(targetUrl)) {
                    defer.resolve(targetUrl.split('#').splice(1)[0]);
                    ph.exit();
                }
            });

            page.open(url, function (status) {
                if (status === 'success') {
                    page.evaluate(function (p) {
                        document.querySelector('[name=username]').value = 'freelook.info';
                        document.querySelector('[name=password]').value = p;
                        return document.querySelector('[type=submit]').getBoundingClientRect();
                    }, function (login) {
                        if (login) {
                            page.sendEvent('click', login.left + 1, login.top + 1);
                        } else {
                            defer.reject(status);
                            ph.exit();
                        }
                    }, pass);


                } else {
                    defer.reject(status);
                    ph.exit();
                }
            });

        });
    }, '--load-images=false', '--ignore-ssl-errors=true', '--ssl-protocol=any');

    return defer.promise;
}

function _handleToken(api, defer) {
    _getToken()
        .then(function (token) {
            _storeToken(api, token)
                .then(function (token) {
                    return defer.resolve(token);
                })
                .catch(function (err) {
                    return defer.reject(err);
                });
        })
        .catch(function (err) {
            return defer.reject(err);
        });
}

function checkToken(_update) {
    if (instagram_token) {
        return $q.when(instagram_token);
    }

    var defer = $q.defer();
    query.first({name: 'token'})
        .then(function (api) {
            var instagram = api && api.get('instagram') || '';
            if (api) {
                if (!_update && instagram && instagram.token) {
                    instagram_token = instagram.token;
                    return defer.resolve(instagram.token);
                } else {
                    _handleToken(api, defer);
                }
            } else {
                _handleToken(new API(), defer);
            }
        }, function (err) {
            return defer.reject(err);
        });

    return defer.promise;
}

function refreshToken() {
    return checkToken(true);
}


module.exports = {
    check: checkToken,
    refresh: refreshToken
};