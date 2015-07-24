'use strict';
angular.module('fli.look')
  .directive('fliLookIframe', function () {
    return {
      controller: 'look.iframe.ctrl',
      controllerAs: 'iframe',
      templateUrl: 'components/look/iframe/iframe.html',
      replace: true,
      link: function (scope, el) {
        scope.iframeEl = $(el).get(0);
      }
    };

  });
