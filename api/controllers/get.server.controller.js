'use strict';

var $http = require('request'),
    iconv = require('iconv-lite');

function getType(_type) {
    var type = _type || '',
        fixedType = type.replace(/\s|-/gi, '');

    if (/utf8/i.test(fixedType)) {
        return 'utf8'
    }

    if (/windows1251/i.test(fixedType)) {
        return 'win1251'
    }
}

module.exports = function (req, res) {

    if (req.query && req.query.url) {

        $http.get({
                url: encodeURI(decodeURI(req.query.url)),
                encoding: null,
                headers: {
                    'User-Agent': 'googlebot'
                }
            },
            function (err, response, html) {
                var type = getType(response.headers['content-type']);
                if (!err && +response.statusCode === +200 && type) {
                    res.json({
                        url: req.query.url,
                        html: iconv.decode(html, type)
                    });
                } else {
                    res.status(404).json({
                        url: req.query.url,
                        err: err,
                        msg: 'error response',
                        response: response
                    });
                }
            }).on('error', function (err) {
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