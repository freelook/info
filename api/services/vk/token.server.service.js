'use strict';

var $http = require('request'),
    phantom = require('phantom'),
    $q = require('q'),
    Parse = require('parse').Parse,
    API = Parse.Object.extend('API'),
    query = new Parse.Query(API),
    id = process.env.VK_ID,
    pass = process.env.VK_PASS;


function _storeToken(api, token) {
    var defer = $q.defer();

    api.set('name', 'token');
    api.set('vk', {
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
            var url = 'https://oauth.vk.com/authorize?client_id=' + id + '&scope=offline,pages,docs,audio,video,groups&redirect_uri=https://oauth.vk.com/blank.html&display=popup&response_type=token';

            page.set('onUrlChanged', function (targetUrl) {
                if (/blank.html#access_token=/.test(targetUrl)) {
                    defer.resolve(targetUrl.split('blank.html#').splice(1)[0]);
                    ph.exit();
                }
            });

            page.open(url, function (status) {
                if (status === 'success') {
                    page.evaluate(function (p) {
                        document.querySelector('[name=email]').value = 'seeonline@mail.ru';
                        document.querySelector('[name=pass]').value = p;
                        return document.querySelector('#install_allow').getBoundingClientRect();
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
    var defer = $q.defer();

    query.first({name: 'token'})
        .then(function (api) {
            var vk = api && api.get('vk') || '';
            if (api) {
                if (!_update && vk && vk.token) {
                    return defer.resolve(vk.token);
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