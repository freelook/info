'use strict';


var $http = require('request'),
    Boilerpipe = require('boilerpipe'),
    regURL = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

module.exports = function (req, res) {
    if (req.query && req.query.url && regURL.test(req.query.url)) {

        $http.get('http://localhost:3000/' + req.query.url, function (err, response, html) {
            if (!err && +response.statusCode === +200) {
                var boilerpipe = new Boilerpipe({
                    extractor: Boilerpipe.Extractor.Article,
                    html: html
                });
                boilerpipe.getHtml(function (err, body) {
                    if (!err) {
                        res.setHeader('Content-Type', 'text/html');
                        res.send(body);
                    }
                });

            } else {
                res.json({
                    Error: 1
                });
            }
        }).on('error', function (err) {
            res.json({
                Error: err
            });
        });
    } else {
        res.json({
            Error: 1
        });
    }
};