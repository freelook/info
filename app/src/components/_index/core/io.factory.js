'use strict';

angular
  .module('freelook.info')
  .factory('io', function ($rootScope, $window, $cookies, CONFIG) {

    var socket = $window.io && $window.io.connect(CONFIG.API.SOCKET),
      _io = {
        socket: socket,
        on: function (eventName, callback) {
          return socket && socket.on(eventName, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
            });
        },
        emit: function (eventName, data, callback) {
          return socket && socket.emit(eventName, data, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                if (callback) {
                  callback.apply(socket, args);
                }
              });
            });
        }
      };

    _io.on('id', function (_id) {
      _io.id = _id;
      $cookies.put('socket', _id);
    });

    return _io;

  });
