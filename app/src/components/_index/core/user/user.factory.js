'use strict';
angular
  .module('freelook.info')
  .factory('user', function ($rootScope, $timeout, Parse) {

    function init() {
      var _usr = current();
      $rootScope.fli.user = _usr;
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

    return {
      init: init,
      current: current
    };

  });


