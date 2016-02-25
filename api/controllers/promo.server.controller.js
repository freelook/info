'use strict';

var promo = require('../services/core/promo'),
    io = require('../services/core/io');

function click(req, res) {

    if (req.query && req.query.id && req.cookies && req.cookies.token) {
        promo.click({
            id: req.query.id,
            token: req.cookies.token
        })
            .then(function (_url) {
                res.redirect(_url);
                io().to(req.cookies.socket).emit('API', 'update');
            })
            .catch(function () {
                res.status(404).send('BAD_LINK');
            });
    } else {
        res.status(404).send('BAD_LINK');
    }

}

module.exports = {
    click: click
};
