'use strict';
angular
  .module('freelook.info')
  .factory('user', function ($rootScope, $timeout, Parse) {

    function init() {
      var _usr = current();
      if (_usr) {
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

    function getSessionToken() {
      var _usr = current();
      if (_usr) {
        return _usr.getSessionToken();
      }
    }

    return {
      init: init,
      current: current,
      getSessionToken: getSessionToken
    };

  });


