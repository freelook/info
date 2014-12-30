'use strict';


var $http = require('request'),
    regURL = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

exports.get = function (req, res) {
    if (req.query.url && regURL.test(req.query.url)) {

        $http.get('http://service.prerender.io/' + decodeURIComponent(req.query.url), function (err, response, body) {
            if (!err && +response.statusCode === +200) {
                res.jsonp(body);
            } else {
                res.jsonp({
                    Error: 1
                });
            }
        });
    } else {
        res.jsonp({
            Error: 1
        });
    }
};