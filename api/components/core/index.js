'use strict';

function init(api, io) {

    // Init api
    require('./config/init')();
    require('./config/express')(api);
    require('./config/socket')(io);

}

module.exports = {
    init: init
};