'use strict';
angular.module('fli.look')
  .directive('fliLookContentFull', function () {
    return {
      controller: 'look.content.full.ctrl',
      templateUrl: 'components/look/content/full/full.html'
    };
  });
