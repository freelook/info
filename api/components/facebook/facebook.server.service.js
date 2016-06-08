'use strict';

var $http = require('request'),
    phantom = require('phantom'),
    $q = require('q'),
    GRAPH_API_ENPOINT = 'https://graph.facebook.com/',
    id = process.env.FB_ID,
    secret = process.env.FB_SECRET,
    appToken = [id, secret].join('|'),
    pass = process.env.FB_PASS,
    tokenModel = require('components/token/token.server.model'),
    fb_token = '';

function _storeToken(tokenModel, token, dateCreation) {

    var defer = $q.defer(),
        expireIn = +token.split('&expires=')[1] || 0,
        expire = (new Date(+dateCreation + expireIn * 1000)).getTime();

    fb_token = token;
    tokenModel.update({
        token: token,
        expire: expire
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
            var url = 'https://www.facebook.com/dialog/oauth?client_id=' + id + '&redirect_uri=https://www.facebook.com/connect/login_success.html&response_type=token&display=popup';

            page.set('onUrlChanged', function (targetUrl) {
                if (/login_success.html#access_token=/.test(targetUrl)) {
                    defer.resolve(targetUrl.split('login_success.html#').splice(1)[0]);
                    ph.exit();
                }
            });

            page.open(url, function (status) {
                if (status === 'success') {
                    page.evaluate(function (p) {
                        document.querySelector('#email').value = 'freelook@mail.ua';
                        document.querySelector('#pass').value = p;
                        return document.querySelector('#loginbutton').getBoundingClientRect();
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

function _exchangeToken(_token) {
    var defer = $q.defer(),
        token = _token.split('access_token=').splice(1)[0] || '';

    $http(GRAPH_API_ENPOINT + 'oauth/access_token?grant_type=fb_exchange_token&client_id=' + id + '&client_secret=' + secret + '&fb_exchange_token=' + token,
        function (err, res, body) {
            if (!err && body && !body.error) {
                return defer.resolve(body);
            }
            return defer.reject(err);
        });

    return defer.promise;
}

function _handleToken(tokenModel, defer, dateCreation) {
    _getToken()
        .then(function (token) {
            _exchangeToken(token)
                .then(function (longToken) {
                    _storeToken(tokenModel, longToken, dateCreation)
                        .then(function (_longToken) {
                            return defer.resolve(_longToken);
                        })
                        .catch(function (err) {
                            return defer.reject(err);
                        });
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
    if (fb_token) {
        return $q.when(fb_token);
    }

    var defer = $q.defer();
    tokenModel.findOrCreate({where: {type: 'facebook'}, defaults: {type: 'facebook', token: ''}})
        .spread(function (_facebook) {
            var _date = (new Date()).getTime();
            if (!_update && _facebook && _facebook.token && +_facebook.expire > +_date) {
                fb_token = _facebook.token;
                return defer.resolve(_facebook.token);
            } else {
                _handleToken(_facebook, defer, _date);
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

function debug(_token) {
    var defer = $q.defer();
    $http(GRAPH_API_ENPOINT + 'debug_token?access_token=' + appToken + '&input_token=' + _token,
        function (err, res, body) {
            if (!err && body && !body.error) {
                var res = JSON.parse(body);
                return defer.resolve(res.data);
            }
            return defer.reject(err);
        });
    return defer.promise;
}

module.exports = {
    check: checkToken,
    refresh: refreshToken,
    debug: debug
};