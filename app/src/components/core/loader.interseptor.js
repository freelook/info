'use strict';
angular
  .module('freelook.info')
  .factory('loaderInterceptor',
    function ($q, $rootScope, $timeout) {

      var count = 0, timer;

      function isLoading() {
        return count > 0;
      }

      function toggleLoader(value) {
        $rootScope.fli.progress = value;
        $timeout.cancel(timer);
        if (value) {
          timer = $timeout(function () {
            toggleLoader(false);
          }, 3333);
        }
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
