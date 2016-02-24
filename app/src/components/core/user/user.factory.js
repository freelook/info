'use strict';
angular
  .module('freelook.info')
  .factory('user', function ($rootScope, $cookies, $timeout, $q, Firebase) {

    function _setUser(user) {
      $timeout(function () {
        $rootScope.fli.user = user;
      });
    }

    function init() {
      return current()
        .then(function (_user) {
          $cookies.put('token', authData().token);
          _setUser(_user.val());
          return _user;
        })
        .catch(function (err) {
          _setUser();
          return $q.reject(err);
        });
    }

    function authData() {
      return Firebase.ref().getAuth() || {};
    }

    function current() {
      var uid = authData().uid;
      if (uid) {
        return Firebase.ref('users').child(uid).once('value');
      }
      return $q.reject();
    }

    return {
      init: init,
      authData: authData,
      current: current
    };

  });


