'use strict';

module.exports = function (api, io) {
    require('./express')(api);
    require('./socket')(io);
};
