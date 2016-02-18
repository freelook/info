'use strict';

var $http = require('request'),
    phantom = require('phantom'),
    $q = require('q'),
    config = require('../../config/config'),
    Firebase = require('firebase'),
    API = new Firebase(config.Firebase.ref + 'api/'),
    id = process.env.FB_ID,
    secret = process.env.FB_SECRET,
    pass = process.env.FB_PASS,
    fb_token = '';


function _storeToken(api, token, dateCreation) {

    var defer = $q.defer(),
        expireIn = +token.split('&expires=')[1] || 0,
        expire = (new Date(+dateCreation + expireIn * 1000)).getTime();

    fb_token = token;
    api.set({
        facebook: {
            token: token,
            expire: expire
        }
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
            var url = 'https://www.facebook.com/login.php?skip_api_login=1&api_key=' + id +
                '&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv2.1%2Fdialog%2Foauth%3Fredirect_uri%3Dhttps%253A%252F%252Fwww.facebook.com%252Fconnect%252Flogin_success.html%26display%3Dpopup%26scope%3Dread_stream%26response_type%3Dtoken%26client_id%3D846841298681206%26ret%3Dlogin&cancel_url=https%3A%2F%2Fwww.facebook.com%2Fconnect%2Flogin_success.html%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%23_%3D_&display=popup';

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

    $http('https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=' + id + '&client_secret=' + secret + '&fb_exchange_token=' + token,
        function (err, res, body) {
            if (!err && body && !body.error) {
                return defer.resolve(body);
            }
            return defer.reject(err);
        });

    return defer.promise;
}

function _handleToken(api, defer, dateCreation) {
    _getToken()
        .then(function (token) {
            _exchangeToken(token)
                .then(function (longToken) {
                    _storeToken(api, longToken, dateCreation)
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
    API.child('facebook').once('value', function (_facebook) {
        var _date = (new Date()).getTime(), facebook = _facebook && _facebook.val();
        if (!_update && facebook && facebook.token && +facebook.expire > +_date) {
            fb_token = facebook.token;
            return defer.resolve(facebook.token);
        } else {
            _handleToken(API, defer, _date);
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