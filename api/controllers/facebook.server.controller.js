'use strict';

var $http = require('request'),
    $q = require('q'),
    token = require('../services/facebook/token');

function search(req, res) {
    var _req;

    if (req.query && req.query.q) {
        token.check()
            .then(function (_token) {
                _req = $http
                    .get({
                        url: 'https://graph.facebook.com/' + req.query.q + '&' + _token
                    })
                    .on('response', function (res) {
                        if (res && res.statusCode === 400) {
                            var headers = res.headers || {},
                                err = headers['www-authenticate'] || '';
                            if (/invalid_token/.test(err)) {
                                token.refresh();
                            }
                        }
                    })
                    .on('error', function () {
                        res.status(404).end();
                    })
                    .pipe(res);
            })
            .catch(function () {
                res.status(404).end();
            });
    } else {
        res.status(404).end();
    }

    res.on('close', function () {
        if (_req && typeof _req.destroy === 'function') {
            _req.destroy();
        }
    });

}

module.exports = {
    search: search
};
