'use strict';

var $http = require('request'),
    phantom = require('phantom'),
    $q = require('q'),
    mongoose = require('mongoose'),
    API = mongoose.model('API'),
    id = '846841298681206',
    pass = process.env.FB_PASS;


function _storeToken(token, dateCreation) {

    var defer = $q.defer();

    var expireIn = +token.split('&expires_in=')[1] || 0,
        expire = new Date(dateCreation.getTime() + expireIn * 1000);

    $q.npost(API, 'findOneAndUpdate', [{'name': 'token'},
        {
            facebook: {
                token: token,
                expire: expire
            }
        }, {upsert: true}])
        .then(function (api) {
            return defer.resolve(api.facebook.token);
        })
        .catch(function (err) {
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

function _handleToken(defer, dateCreation) {
    _getToken()
        .then(function (token) {
            _storeToken(token, dateCreation)
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

function checkToken() {

    var defer = $q.defer();

    $q.ninvoke(API, 'findOne', {'name': 'token'})
        .then(function (api) {
            var _date = new Date();
            if (api && api.facebook && api.facebook.token && api.facebook.expire) {
                if (api.facebook.expire > _date) {
                    return defer.resolve(api.facebook.token);
                } else {
                    _handleToken(defer, _date);
                }
            } else {
                _handleToken(defer, _date);
            }

        })
        .catch(function (err) {
            return defer.reject(err);
        });

    return defer.promise;
}

function refreshToken() {
    var defer = $q.defer(),
        _date = new Date();
    _handleToken(defer, _date);
    return defer.promise;
}


module.exports = {
    check: checkToken,
    refresh: refreshToken
};