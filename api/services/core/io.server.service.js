'use strict';

var io;

module.exports = function (_io) {

    if (io) {
        return io;
    }

    io = _io;

};
