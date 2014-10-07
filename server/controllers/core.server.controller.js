'use strict';

/**
 * Module dependencies.
 */
var config = require('../../config/config');

exports.index = function (req, res, next) {
    var _date = config.vk.date || (new Date()).getTime();
    res
        .cookie('vk_time', _date, {httpOnly: true})
        .render('index', {
        user: req.user || null,
        date: _date
    });
};