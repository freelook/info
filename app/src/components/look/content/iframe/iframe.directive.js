'use strict';
angular.module('fli.look')
  .directive('fliLookIframe', function () {
    return {
      controller: 'look.iframe.ctrl',
      controllerAs: 'iframe',
      templateUrl: 'components/look/content/iframe/iframe.html'
    };

  });
