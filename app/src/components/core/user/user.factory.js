'use strict';
angular
  .module('freelook.info')
  .factory('user', function ($rootScope, $cookies, $timeout, Firebase) {

    function init() {
      var _usr = current();
      if (_usr) {
        $cookies.put('token', _usr.uid);
        Firebase.ref('users/' + _usr.uid)
          .once('value', function (userData) {
            $timeout(function () {
              $rootScope.fli.user = userData.val();
              console.log(userData.val());
            });
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


