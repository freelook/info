'use strict';
angular.module('fli.look')
  .directive('fliLookFull', function ($rootScope, prerender, Full) {
    return {
      templateUrl: 'components/look/full/full.html',
      link: function (scope) {
        if ($rootScope.fli.route.url) {
          prerender.get($rootScope.fli.route.url).then(function (html) {
            try {
              $rootScope.fli.progress = true;
              scope.html = Full.get(html);
            }
            finally {
              $rootScope.fli.progress = false;
            }
          });
        }

      }
    };

  });
