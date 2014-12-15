'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config');

exports.index = function (req, res, next) {
    res.render('index', {
        user: req.user || null,
        'bs': '{{',
        'be': '}}'
    });
};