'use strict';


var $http = require('request'),
    Boilerpipe = require('boilerpipe'),
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
                    var boilerpipe = new Boilerpipe({
                        extractor: Boilerpipe.Extractor.Article,
                        html: html
                    });

                    $q.all([$q.ninvoke(boilerpipe, 'getHtml'), $q.ninvoke(boilerpipe, 'getImages')])
                        .then(function (results) {
                            res.json({
                                html: results[0],
                                images: results[1]
                            });
                        })
                        .catch(function () {
                            res.status(404).end();
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