'use strict';
angular.module('fli.look')
  .directive('fliLookContentRich', function () {
    return {
      controller: 'look.content.rich.ctrl',
      templateUrl: 'components/look/content/rich/rich.html'
    };

  });
