'use strict';

var $http = require('request');

function market(req, res) {
    if (req.query && req.query.text) {
        var _req = $http
            .get({
                url: 'https://api.content.market.yandex.ru/v1/search.json?remote_ip=' + req.ip +
                '&text=' + encodeURI(decodeURI(req.query.text)),
                headers: {
                    'Authorization': process.env.YANDEX_KEY || ''
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
            msg: 'error text' + req.ip
        });
    }

    res.on('close', function () {
        if (_req && typeof _req.destroy === 'function') {
            _req.destroy();
        }
    });
}

module.exports = {
    market: market
};