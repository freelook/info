'use strict';

var promo = require('../services/promo/promo');

function click(req, res) {

    if (req.query && req.query.id && req.query.token) {
        promo.click({
            id: req.query.id,
            token: req.query.token
        })
            .then(function (_url) {
                var link = _url || '';
                res.redirect(link);
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
