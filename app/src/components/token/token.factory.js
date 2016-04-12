'use strict';
angular
  .module('fli.token')
  .factory('token', function ($window, platform) {

    function send(req, _platform) {
      platform.send(req, _platform).finally(function () {
        $window.close();
      });
    }

    return {
      send: send
    };

  });
