'use strict';
angular
  .module('freelook.info')
  .factory('user', function ($rootScope, $cookies, $timeout, $q, Firebase) {

    function init() {
      var _authData = authData();
      if (_authData) {
        $cookies.put('token', _authData.token);
      }
      $timeout(function () {
        $rootScope.fli.user = _authData;
      });
    }

    function authData() {
      return Firebase.ref().getAuth();
    }

    return {
      init: init,
      authData: authData
    };

  });


