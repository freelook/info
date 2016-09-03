'use strict';

var swig = require('swig');

function render(req, res) {
    res.render('widget', req.body);
}

module.exports = {
    render: render
};