'use strict';

var user = require('./user'),
    promo = require('./promo'),
    firebase = require('./firebase'),
    red = require('./red');

function init(server, api) {
    red.init(server, api);
    firebase.init();
    user.init();
    promo.init();
}

module.exports = {
    init: init
};