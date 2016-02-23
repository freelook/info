'use strict';

var user = require('./user');

function init() {
    user.init();
}

module.exports = {
    init: init
};