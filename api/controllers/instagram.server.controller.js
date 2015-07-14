'use strict';

var $http = require('request'),
    $q = require('q'),
    token = require('../services/instagram/token');

function search(req, res) {
    var _req;

    if (req.query && req.query.q) {
        token.check()
            .then(function (_token) {
                _req = $http
                    .get({
                        url: 'https://api.instagram.com/v1/tags/' + req.query.q + '/media/recent?' + _token
                    })
                    .on('error', function () {
                        token.refresh();
                        res.status(404).end();
                    })
                    .pipe(res);
            })
            .catch(function () {
                res.status(404).end();
            });
    } else {
        res.status(404).end(process.env.INSTAGRAM_ID + ' '+ process.env.INSTAGRAM_PASS);
    }

    res.on('close', function () {
        if (_req && typeof _req.destroy === 'function') {
            _req.destroy();
        }
    });

}

module.exports = {
    search: search
};
