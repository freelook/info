'use strict';
angular
  .module('freelook.info')
  .factory('user', function ($rootScope, $cookies, $timeout, Parse) {

    function init() {
      var _usr = current();
      if (_usr) {
        $cookies.put('token', _usr.getSessionToken());
        _usr.fetch().then(function () {
          $timeout(function () {
            $rootScope.fli.user = current();
          });
        });
      }
    }

    function current() {
      return Parse.User.current();
    }

    return {
      init: init,
      current: current
    };

  });


