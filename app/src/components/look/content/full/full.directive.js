'use strict';
angular.module('fli.look')
  .directive('fliLookContentFull', function () {
    return {
      controller: 'look.content.full.ctrl',
      controllerAs: 'fullCtrl',
      templateUrl: 'components/look/content/full/full.html'
    };
  });
