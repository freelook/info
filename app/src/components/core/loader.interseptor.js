'use strict';
angular
  .module('freelook.info')
  .factory('loaderInterceptor',
  function ($q, $rootScope) {

    var count = 0;

    function isLoading() {
      return count > 0;
    }

    function toggleLoader(value) {
      $rootScope.fli.progress = value;
    }

    $rootScope.$on('$routeChangeStart', function () {
      count = 0;
      toggleLoader(false);
    });

    return {
      toggleLoader: toggleLoader,
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
