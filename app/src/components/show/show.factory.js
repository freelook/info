'use strict';

angular
  .module('fli.show')
  .factory('show',
  function ($rootScope) {

    function clearInput() {
      $rootScope.fli.route.input = null;
    }

    return {
      clearInput: clearInput
    };

  });

