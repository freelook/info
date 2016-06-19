'use strict';

var $q = require('q'),
    jwt = require('jwt-simple'),
    secret = process.env.FB_SECRET;


function decode(_token) {
    if (_token) {
        try {
            return jwt.decode(_token, secret);
        } catch (e) {
            return '';
        }
    }
    return '';
}

function encode(data) {
    if (data) {
        try {
            return jwt.encode(data, secret);
        } catch (e) {
            return '';
        }
    }
    return '';
}

module.exports = {
    decode: decode,
    encode: encode
};