'use strict';

var firebase = require('components/core/firebase'),
    user = require('components/users/users.server.service'),
    promo = require('components/promo/promo.server.service');

function init(api, io) {

    // Init api
    require('./config/init')();
    require('./config/express')(api);
    require('./config/socket')(io);

    // Init components
    firebase.init();
    user.init();
    promo.init();
}

module.exports = {
    init: init
};