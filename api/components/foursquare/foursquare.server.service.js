'use strict';

var token = ['&client_id=',
    process.env.FOURSQUARE_CLIENT_ID,
    '&client_secret=',
    process.env.FOURSQUARE_CLIENT_SECRET,
    '&v=20130815'
].join('');

module.exports = {
    token: token
};