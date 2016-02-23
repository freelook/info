'use strict';
angular
  .module('freelook.info')
  .factory('user', function ($rootScope, $cookies, $timeout, $q, Firebase) {

    function init() {
      var _authData = authData();
      if (_authData) {
        $cookies.put('token', _authData.uid);
      }
      $timeout(function () {
        $rootScope.fli.user = _authData;
      });
    }

    function current() {
      //var _authData = authData();
      //if (_authData.uid) {
      //  return $firebaseObject(Firebase.ref('users').child(_authData.uid)).$loaded();
      //}
      return $q.when(authData());
    }

    function authData() {
      return Firebase.ref().getAuth();
    }

    return {
      init: init,
      current: current,
      authData: authData
    };

  });


