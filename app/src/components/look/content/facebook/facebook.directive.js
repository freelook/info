'use strict';
angular.module('fli.look')
  .directive('fliLookContentFacebook', function () {
    return {
      controller: 'look.content.facebook.ctrl',
      controllerAs: 'fb',
      templateUrl: 'components/look/content/facebook/facebook.html'
    };

  });
