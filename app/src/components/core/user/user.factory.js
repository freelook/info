'use strict';
angular
  .module('freelook.info')
  .factory('user', function ($rootScope, $cookies, $timeout, $q, $firebaseObject, Firebase) {

    function init() {
      current().then(function (_usr) {
        $cookies.put('token', _usr ? _usr.uid : '');
        $timeout(function () {
          $rootScope.fli.user = _usr;
        });
      });
    }

    function current() {
      var _authData = authData();
      if (_authData.uid) {
        return $firebaseObject(Firebase.ref('users').child(_authData.uid)).$loaded();
      }
      return $q.when();
    }

    function authData() {
      return Firebase.authObj().$getAuth() || {};
    }

    return {
      init: init,
      current: current,
      authData: authData
    };

  });


