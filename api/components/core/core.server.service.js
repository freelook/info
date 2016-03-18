'use strict';

var firebase = require('components/core/firebase'),
    user = require('components/core/user/user.server.service'),
    promo = require('components/promo/promo.server.service');

function init() {
    firebase.init();
    user.init();
    promo.init();
}

module.exports = {
    init: init
};