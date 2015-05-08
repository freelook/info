'use strict';

var $http = require('request'),
    $q = require('q'),
    regURL = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

module.exports = function (req, res) {
    if (req.query && req.query.url && regURL.test(req.query.url)) {

        $http.get({
                url: req.query.url,
                headers: {
                    'User-Agent': 'googlebot'
                }
            },
            function (err, response, html) {
                if (!err && +response.statusCode === +200) {

                    res.json({
                        html: html
                    });

                } else {
                    res.status(404).end();
                }
            }).on('error', function (err) {
                res.status(404).end();
            });
    } else {
        res.status(404).end();
    }
};