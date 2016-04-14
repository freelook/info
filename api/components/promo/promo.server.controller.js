'use strict';

var io = require('components/core/io');

function click(req, res) {
    io().to(req.cookies.socket).emit('API', 'update');
    res.status(404).send('BAD_LINK');
}

module.exports = {
    click: click
};
