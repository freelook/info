'use strict';

var user = require('./user'),
    firebase = require('./firebase'),
    red = require('./red');

function init(server, api) {
    red.init(server, api);
    firebase.init();
    user.init();
}

module.exports = {
    init: init
};