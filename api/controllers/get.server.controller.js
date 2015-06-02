'use strict';

var $http = require('request');

module.exports = function (req, res) {
    if (req.query && req.query.url) {
        $http
            .get({
                url: encodeURI(decodeURI(req.query.url)),
                headers: {
                    'User-Agent': 'googlebot'
                }
            })
            .pipe(res)
            .on('error', function (err) {
                res.status(404).json({
                    err: err || true,
                    msg: 'error request'
                });
            });
    } else {
        res.status(404).json({
            err: true,
            msg: 'error url'
        });
    }
};