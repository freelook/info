'use strict';

var $http = require('request'),
    token = require('./foursquare.server.service').token;

function get(req, res) {
    var _req;
    console.log(token);

    if (req.query && req.query.q) {
        _req = $http
            .get({
                url: 'https://api.foursquare.com/v2/' + encodeURI(decodeURI(req.query.q)) + token
            })
            .on('error', function () {
                res.status(404).end();
            })
            .pipe(res);
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
    get: get
};
