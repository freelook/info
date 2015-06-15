'use strict';

var $http = require('request'),
    $q = require('q'),
    token = require('../services/facebook/token');

function search(req, res) {
    var _req;

    if (req.query && req.query.q) {
        token.check()
            .then(function (token) {
                var type = req.query.type || 'group';
                _req = $http
                    .get({
                        url: 'https://graph.facebook.com/search?q=' + req.query.q + '&type=' + type + '&' + token
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
