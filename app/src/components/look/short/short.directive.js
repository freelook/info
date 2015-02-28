'use strict';
angular.module('fli.look')
  .directive('fliLookShort', function ($rootScope, prerender, Short) {
    return {
      templateUrl: 'components/look/short/short.html',
      link: function (scope) {

        scope.shortData = [];

        if ($rootScope.fli.route.url) {
          prerender.get($rootScope.fli.route.url).then(function (html) {
            try {
              $rootScope.fli.progress = true;
              scope.shortData = Short.get(html, $rootScope.fli.route);
            }
            finally {
              $rootScope.fli.progress = false;
            }
          });
        }

      }
    };

  });
