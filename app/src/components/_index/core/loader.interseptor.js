'use strict';
angular
  .module('freelook.info')
  .factory('LoaderInterceptor',
  function ($q, $rootScope) {

    var count = 0;

    function isLoading() {
      return count > 0;
    }

    function toggleLoader(value) {
      $rootScope.fli.progress = value;
    }

    return {
      request: function (config) {
        count++;
        toggleLoader(isLoading());
        return config || $q.when(config);
      },
      response: function (response) {
        --count;
        toggleLoader(isLoading());
        return response || $q.when(response);
      },
      responseError: function (response) {
        --count;
        toggleLoader(isLoading());
        return $q.reject(response);
      }

    };

  });
