'use strict';

module.exports = function (io) {
    io.on('connection', function (socket) {

        socket.on('question', function (data, call) {
            call({look: 1});
            socket.broadcast.emit('need', data);
        });
    });
};