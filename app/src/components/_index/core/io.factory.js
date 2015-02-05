'use strict';

angular
  .module('freelook.info')
  .factory('io', function ($rootScope, $window) {

    var socket = $window.io && $window.io.connect($window.CONFIG.API.URL);

    return {
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
  });