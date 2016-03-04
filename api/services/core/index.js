'use strict';

var user = require('./user'),
    promo = require('./promo'),
    firebase = require('./firebase');

function init() {
    firebase.init();
    user.init();
    promo.init();
}

module.exports = {
    init: init
};