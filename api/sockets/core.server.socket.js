'use strict';

module.exports = function (io) {
    io.on('connection', function (socket) {

        socket.emit('id', socket.id);

        socket.on('question', function (data, call) {
            call({look: 1});
            socket.broadcast.emit('need', data);
        });
    });
};