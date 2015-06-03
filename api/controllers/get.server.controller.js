'use strict';

var $http = require('request');

module.exports = function (req, res) {
    if (req.query && req.query.url) {
        var _req = $http
            .get({
                url: encodeURI(decodeURI(req.query.url)),
                headers: {
                    'User-Agent': 'googlebot'
                }
            })
            .on('error', function (err) {
                res.status(404).json({
                    err: err || true,
                    msg: 'error request'
                });
            })
            .pipe(res);
    } else {
        res.status(404).json({
            err: true,
            msg: 'error url'
        });
    }

    res.on('close', function () {
        if (_req && typeof _req.destroy === 'function') {
            _req.destroy();
        }
    });
};