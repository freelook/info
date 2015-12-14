'use strict';

var $http = require('request'),
    oauth = {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_TOKEN_SECRET
    };

function get(req, res) {
    var _req;

    if (req.query && req.query.q) {
        _req = $http
            .get({
                url: 'https://api.twitter.com/1.1/' + encodeURI(decodeURI(req.query.q)),
                oauth: oauth
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
