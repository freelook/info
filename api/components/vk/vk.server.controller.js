'use strict';

var $http = require('request'),
    $q = require('q'),
    token = require('./vk.server.service');

function query(req, res) {
    var _req;

    if (req.query && req.query.q) {
        token.check()
            .then(function (_token) {
                _req = $http
                    .get({
                        url: 'https://api.vk.com/method/' + encodeURI(decodeURI(req.query.q)) + '&' + _token
                    })
                    .on('error', function () {
                        token.refresh();
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
    query: query
};
