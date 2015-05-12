'use strict';

var $http = require('request'),
    $q = require('q');

module.exports = function (req, res) {

    if (req.query && req.query.url) {

        if(req.query.url === 'test') {
            req.query.url = 'https://ru.wikipedia.org/wiki/Киев';
        }

        $http.get({
                url: req.query.url,
                headers: {
                    'User-Agent': 'googlebot'
                }
            },
            function (err, response, html) {
                if (!err && +response.statusCode === +200) {

                    res.json({
                        url: req.query.url,
                        html: html
                    });

                } else {
                    res.status(404).json({
                        url: req.query.url,
                        err: err,
                        response: response,
                        html: html
                    });
                }
            }).on('error', function (err) {
                res.status(404).send('error request');
            });
    } else {
        res.status(404).send('error url');
    }
};