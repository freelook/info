'use strict';
angular.module('fli.look')
  .directive('inappView', function ($rootScope, inAppIframe) {
    return function () {

      if ($rootScope.fli.route.url) {
        inAppIframe.open($rootScope.fli.route.url);
      }

    };
  });
