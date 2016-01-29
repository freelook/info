'use strict';
angular
  .module('freelook.info')
  .factory('user', function ($rootScope, $cookies, $timeout, Firebase) {

    function init() {
      var _usr = current();
      if (_usr) {
        $cookies.put('token', _usr.uid);
        $timeout(function () {
          $rootScope.fli.user = _usr;
        });
      }
    }

    function current() {
      return Firebase.authObj().$getAuth();
    }

    return {
      init: init,
      current: current
    };

  });


