'use strict';

var $http = require('request'),
    phantom = require('phantom'),
    $q = require('q'),
    id = process.env.INSTAGRAM_ID,
    pass = process.env.INSTAGRAM_PASS,
    tokenModel = require('components/token/token.server.model'),
    instagram_token = '';


function _storeToken(tokenModel, token) {
    var defer = $q.defer();

    instagram_token = token;
    tokenModel.update({
        token: token,
        expire: 0
    })
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
            var url = 'https://instagram.com/oauth/authorize/?client_id=' + id + '&redirect_uri=http://freelook.info&response_type=token&scope=public_content';

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

function _handleToken(tokenModel, defer) {
    _getToken()
        .then(function (token) {
            _storeToken(tokenModel, token)
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
    tokenModel.findOrCreate({where: {type: 'instagram'}, defaults: {type: 'instagram', token: ''}})
        .spread(function (_instagram) {
            if (!_update && _instagram && _instagram.token) {
                instagram_token = _instagram.token;
                return defer.resolve(_instagram.token);
            } else {
                _handleToken(_instagram, defer);
            }
        })
        .catch(function (err) {
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