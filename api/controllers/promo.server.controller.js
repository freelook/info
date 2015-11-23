'use strict';

var promo = require('../services/promo/promo'),
    io = require('../services/core/io');

function click(req, res) {

    if (req.query && req.query.id && req.cookies && req.cookies.token) {
        promo.click({
            id: req.query.id,
            token: req.cookies.token
        })
            .then(function (_url) {
                var link = _url || '';
                res.redirect(link);
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
