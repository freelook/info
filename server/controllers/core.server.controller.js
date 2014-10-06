'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config');

exports.index = function (req, res) {
    var _date = config.date || (new Date()).getTime();
    res.render('index', {
        user: req.user || null,
        date: _date
    });
};